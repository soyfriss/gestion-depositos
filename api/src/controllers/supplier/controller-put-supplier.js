const { Supplier } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const editSupplier = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, phone, status } = req.body;

        let supplier = await Supplier.findByPk(id);
        
        if (!supplier) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: constants.ITEM_NOT_FOUND});
        }

        await supplier.update({
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

module.exports = { editSupplier };
