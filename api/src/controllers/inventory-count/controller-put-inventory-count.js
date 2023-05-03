const { InventoryCount, InventoryCountItem, conn } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const constants = require('../../utils/constants');
const updateStock = require('../stock/update-stock');

const editInventoryCount = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await conn.transaction(async (transaction) => {
            const inventoryCount = await InventoryCount.findByPk(id, {
                include: [
                    {model: InventoryCountItem},
                ],
                transaction
            });

            console.log(inventoryCount);

            if (!inventoryCount) {
                res.status(httpStatusCodes.BAD_REQUEST).json({ error: constants.ITEM_NOT_FOUND });
            }

            if (inventoryCount.status === 'Canceled') {
                res.status(httpStatusCodes.BAD_REQUEST).json({ error: constants.INVALID_ORDER_STATUS_CHANGE });
            }

            await inventoryCount.update({
                status
            }, { transaction });

            for (const item of inventoryCount.InventoryCountItems) {
                await updateStock(item.productId, -(item.realQty - item.currentQty), transaction);
            }

            res.status(httpStatusCodes.OK).json(inventoryCount);
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { editInventoryCount };
