const { DeliveryNote, DeliveryNoteItem, Employee, conn } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const updateStock = require('../stock/update-stock');
const { changeTicketState } = require('../ticket/change-ticket-state');
const { createTicketArticle } = require('../ticket/create-ticket-article');
const Status = require('./status-enum');
const mailer = require('../../utils/mailer');

const createDeliveryNote = async (req, res, next) => {
    console.log('createDeliveryNote called');
    try {
        const { employeeId, documentDate, items, employeeSign, ticketNumber, ticketId } = req.body;

        await conn.transaction(async (transaction) => {
            const deliveryNote = await DeliveryNote.create({
                employeeId,
                documentDate,
                documentNumber: await DeliveryNote.max('documentNumber') + 1,
                ticketNumber,
                employeeSign,
                status: Status.Completed
            }, { transaction });

            for (const item of items) {
                await DeliveryNoteItem.create({
                    deliveryNoteId: deliveryNote.id,
                    productId: item.productId,
                    quantity: item.quantity
                }, { transaction });

                // Update stock
                await updateStock(item.productId, -item.quantity, transaction);
            }

            // Ticket management
            if (ticketId) {
                await createTicketArticle(ticketId, `Delivery Note N° ${deliveryNote.documentNumber} created.`);

                await changeTicketState(ticketId, 'closed');
            }

            // Send notification by email
            let employee = await Employee.findByPk(employeeId, { transaction });
            const to = employee.email;
            const subject = `Delivery Note created`;
            const body = {
                name: `${employee.firstname} ${employee.lastname}`,
                greeting: 'Hello',
                signature: 'Best regards',
                intro: `This is to inform that the Delivery Note N° ${deliveryNote.documentNumber} has been created.`,
                outro: ''
            }

            await mailer(to, subject, body);

            return res.status(httpStatusCodes.OK).json(deliveryNote);
        });
    } catch (error) {
        next(error)
    }
}

module.exports = { createDeliveryNote };
