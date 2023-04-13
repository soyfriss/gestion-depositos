const { Supplier } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const createSupplier = async (req, res, next) => {
    try {
        const { name, email, phone, status } = req.body;
        const supplier = await Supplier.create({
            name,
            email, 
            phone, 
            status
        });

        res.status(httpStatusCodes.OK).json(supplier);
    } catch (error) {
        next(error);
    }
}

module.exports = { createSupplier };
