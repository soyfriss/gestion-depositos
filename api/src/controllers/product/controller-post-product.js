const { Product } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const createProduct = async (req, res, next) => {
    try {
        const { name, description, stock, status, categories } = req.body;
        const product = await Product.create({
            name,
            description,
            stock,
            status
        });

        // Categories
        if (categories && categories.length) {
            await product.addCategories(categories);
        }

        res.status(httpStatusCodes.OK).json(product);
    } catch (error) {
        next(error);
    }
}

module.exports = { createProduct };
