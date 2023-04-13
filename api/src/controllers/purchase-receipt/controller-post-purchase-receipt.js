const { PurchaseReceipt, PurchaseReceiptItem, conn } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const updateStock = require('../stock/update-stock');
const Status = require('./status-enum');

const createPurchaseReceipt = async (req, res, next) => {
    console.log('In createPurchaseReceipt');
    try {
        const { supplierId, documentDate, documentNumber, items } = req.body;

        await conn.transaction(async (transaction) => {
            const purchaseReceipt = await PurchaseReceipt.create({
                supplierId,
                documentDate,
                documentNumber,
                status: Status.Completed
            }, { transaction });

            for (const item of items) {
                await PurchaseReceiptItem.create({
                    purchaseReceiptId: purchaseReceipt.id,
                    productId: item.productId,
                    quantity: item.quantity
                }, { transaction });

                // Update stock
                await updateStock(item.productId, item.quantity, transaction);
            }

            return res.status(httpStatusCodes.OK).json(purchaseReceipt);
        });
    } catch (error) {
        next(error)
    }
}

module.exports = { createPurchaseReceipt };
