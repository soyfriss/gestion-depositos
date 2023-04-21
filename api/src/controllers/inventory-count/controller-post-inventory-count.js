const { InventoryCount, InventoryCountItem, Product, conn } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const updateStock = require('../stock/update-stock');
const Status = require('./status-enum');

const createInventoryCount = async (req, res, next) => {
    try {
        const { userId, documentDate, items } = req.body;

        await conn.transaction(async (transaction) => {
            const inventoryCount = await InventoryCount.create({
                userId,
                documentDate,
                status: Status.Completed
            }, { transaction });

            for (const item of items) {

                // Get product to obtain current quantity
                const product = Product.findByPk(item.productId);
                
                await InventoryCountItem.create({
                    inventoryCountId: inventoryCount.id,
                    productId: item.productId,
                    currentQty: product.currentQty,
                    realQty: item.realQty,
                    difference: product.currentQty - item.realQty
                }, { transaction });

                // Update stock
                await updateStock(item.productId, product.currentQty - item.realQty, transaction);
            }

            return res.status(httpStatusCodes.OK).json(inventoryCount);
        });
    } catch (error) {
        next(error)
    }
}

module.exports = { createInventoryCount };
