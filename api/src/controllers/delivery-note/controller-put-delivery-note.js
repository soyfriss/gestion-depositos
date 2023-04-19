const { DeliveryNote, DeliveryNoteItem, Employee, conn } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const constants = require('../../utils/constants');
const updateStock = require('../stock/update-stock');
const { changeTicketState } = require('../ticket/change-ticket-state');
const { getTicketByNumber } = require('../ticket/get-ticket-by-number');
const { createTicketArticle } = require('../ticket/create-ticket-article');
const mailer = require('../../utils/mailer');

const editDeliveryNote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await conn.transaction(async (transaction) => {
            const deliveryNote = await DeliveryNote.findByPk(id, {
                include: [
                    { model: DeliveryNoteItem },
                    { model: Employee }
                ],
                transaction
            });

            if (!deliveryNote) {
                res.status(httpStatusCodes.BAD_REQUEST).json({ error: constants.ITEM_NOT_FOUND });
            }

            if (deliveryNote.status === 'Canceled') {
                res.status(httpStatusCodes.BAD_REQUEST).json({ error: constants.INVALID_ORDER_STATUS_CHANGE });
            }

            await deliveryNote.update({
                status
            }, { transaction });

            for (const item of deliveryNote.DeliveryNoteItems) {
                await updateStock(item.productId, item.quantity, transaction);
            }

            // Reopen associated ticket
            if (deliveryNote.ticketNumber) {
                const ticket = await getTicketByNumber(deliveryNote.ticketNumber);
                console.log('ticket: ', ticket);

                await createTicketArticle(ticket.id, `Delivery Note N° ${deliveryNote.documentNumber} canceled.`)

                await changeTicketState(ticket.id, 'open');
            }

            // Send notification by email
            let employee = await Employee.findByPk(deliveryNote.Employee.id, { transaction });
            const to = employee.email;
            const subject = `Delivery Note canceled`;
            const body = {
                name: `${employee.firstname} ${employee.lastname}`,
                greeting: 'Hello',
                signature: 'Best regards',
                intro: `This is to inform that the Delivery Note N° ${deliveryNote.documentNumber} has been canceled.`,
                outro: ''
            }

            await mailer(to, subject, body);

            res.status(httpStatusCodes.OK).json(deliveryNote);
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { editDeliveryNote };

