const { DeliveryNote, DeliveryNoteItem, conn } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const createDeliveryNote = async (req, res, next) => {
    try {
        const { employeeId, documentDate, items } = req.body;

        await conn.transaction(async (transaction) => {
            const deliveryNote = await DeliveryNote.create({
                employeeId,
                documentDate,
                documentNumber: await DeliveryNote.max('documentNumber') + 1,
                employeeSign: 'sign',
                status: 'Completed'
            }, { transaction });

            for (const item of items) {
                await DeliveryNoteItem.create({
                    deliveryNoteId: deliveryNote.id,
                    productId: item.productId,
                    quantity: item.quantity
                }, { transaction })
            }

            return res.status(httpStatusCodes.OK).json(deliveryNote);
        });
    } catch (error) {
        next(error)
    }
}

module.exports = { createDeliveryNote };
