const { Product, conn } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const updateCategories = require('./update-categories');
const updatePhotos = require('./update-photos');

const createProduct = async (req, res, next) => {
    try {
        const { name, description, stock, status, categories, ProductPhotos } = req.body;

        await conn.transaction(async (t) => {
            const product = await Product.create({
                name,
                description,
                stock,
                status
            });
    
            // Categories
            await updateCategories(product, categories, t);
            // Photos
            await updatePhotos(product, ProductPhotos, t);
    
            res.status(httpStatusCodes.OK).json(product);
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { createProduct };
