const { DeliveryNote, DeliveryNoteItem, conn } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const constants = require('../../utils/constants');
const updateStock = require('../stock/update-stock');

const editDeliveryNote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await conn.transaction(async (transaction) => {
            const deliveryNote = await DeliveryNote.findByPk(id, {
                include: [
                    { model: DeliveryNoteItem }
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

            res.status(httpStatusCodes.OK).json(deliveryNote);
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { editDeliveryNote };

