const { Supplier } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const getSupplier = async (req, res, next) => {
    try {
        const { id } = req.params;

        let supplier = await Supplier.findByPk(id);

        res.status(httpStatusCodes.OK).json(supplier);
        
    } catch (error) {
        next(error);
    }
}

module.exports = { getSupplier };
