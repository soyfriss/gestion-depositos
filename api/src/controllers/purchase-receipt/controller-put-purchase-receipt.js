const { PurchaseReceipt, PurchaseReceiptItem, conn } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const constants = require('../../utils/constants');
const updateStock = require('../stock/update-stock');

const editPurchaseReceipt = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await conn.transaction(async (transaction) => {
            const purchaseReceipt = await PurchaseReceipt.findByPk(id, {
                include: [
                    { model: PurchaseReceiptItem }
                ],
                transaction
            });

            if (!purchaseReceipt) {
                res.status(httpStatusCodes.BAD_REQUEST).json({ error: constants.ITEM_NOT_FOUND });
            }

            if (purchaseReceipt.status === 'Canceled') {
                res.status(httpStatusCodes.BAD_REQUEST).json({ error: constants.INVALID_ORDER_STATUS_CHANGE });
            }

            await purchaseReceipt.update({
                status
            }, { transaction });

            for (const item of purchaseReceipt.PurchaseReceiptItems) {
                await updateStock(item.productId, -item.quantity, transaction);
            }

            res.status(httpStatusCodes.OK).json(purchaseReceipt);
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { editPurchaseReceipt };
