const { PurchaseReceipt } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const getPurchaseReceipt = async (req, res, next) => {
    try {
        const { id } = req.params;

        const purchaseReceipt = await PurchaseReceipt.findByPk(id, { include: { all: true, nested: true } });

        res.status(httpStatusCodes.OK).json(purchaseReceipt);
    } catch (error) {
        next(error);
    }
}

module.exports = { getPurchaseReceipt };
