const { InventoryCount, User, InventoryCountItem, Product } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const getInventoryCount = async (req, res, next) => {
    try {
        const { id } = req.params;

        const inventoryCount = await InventoryCount.findByPk(id, {
            include: [
                { model: User },
                {
                    model: InventoryCountItem,
                    include: [
                        { model: Product }
                    ]
                }
            ]
        });

        res.status(httpStatusCodes.OK).json(inventoryCount);
    } catch (error) {
        next(error);
    }
}

module.exports = { getInventoryCount };

