const { Product, conn } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const constants = require('../../utils/constants');
const updateCategories = require('./update-categories');
const updatePhotos = require('./update-photos');

const editProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, status, categories, ProductPhotos } = req.body;

        await conn.transaction(async (t) => {
            const product = await Product.findByPk(id, { transaction: t });
            
            if (!product) {
                res.status(httpStatusCodes.BAD_REQUEST).json({ error: constants.ITEM_NOT_FOUND });
            }
            
            await product.update({
                name,
                description,
                status
            },
            { transaction: t }
            );
            
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

module.exports = { editProduct };
