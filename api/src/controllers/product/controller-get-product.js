const { Product } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        
        res.status(httpStatusCodes.OK).json(product);
    } catch (error) {
        next(error);
    }
} 

module.exports = { getProduct };
