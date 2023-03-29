const { Product, conn } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const constants = require('../../utils/constants');

const editProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, stock, status, categories } = req.body;

        await conn.transaction(async (t) => {
            const product = await Product.findByPk(id, { transaction: t });
            const productCategories = await product.getCategories({ transaction: t });

            if (!product) {
                res.status(httpStatusCodes.BAD_REQUEST).json({ error: constants.ITEM_NOT_FOUND });
            }

            await product.update({
                name,
                description,
                stock,
                status
            },
                { transaction: t }
            );

            // Edit categories
            await product.removeCategories(productCategories, { transaction: t });
            if (categories && categories.length) {
                await product.addCategories(categories, { transaction: t });
            }

            res.status(httpStatusCodes.OK).json(product);
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { editProduct };
