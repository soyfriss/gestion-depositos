const { Product } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const constants = require('../../utils/constants');

const editProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, stock, status } = req.body;

        const product = await Product.findByPk(id);

        if (!product) {
            res.status(httpStatusCodes.BAD_REQUEST).json({ error: constants.ITEM_NOT_FOUND });
        }

        await product.update({
            name,
            description,
            stock,
            status
        });

        res.status(httpStatusCodes.OK).json(product);
    } catch (error) {
        next(error);
    }
}

module.exports = { editProduct };
