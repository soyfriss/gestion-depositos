const { Product, Category, ProductPhoto } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
require('dotenv').config();
const {
    IMAGE_URL
} = process.env;

const imageUrl = process.env.IMAGE_PATH;

const getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(
            id,
            {
                include: [{
                    model: Category,
                    attributes: ['id'],
                    through: { attributes: [] }
                }, {
                    model: ProductPhoto,
                    attributes: ['path']
                }]
            }
        );

        res.status(httpStatusCodes.OK).json({
            id: product.id,
            name: product.name,
            description: product.description,
            currentQty: product.currentQty,
            status: product.status,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            categories: product.Categories.map(c => c.id),
            ProductPhotos: product.ProductPhotos.map(p => {
                return {
                    id: p.id,
                    title: p.path,
                    src: IMAGE_URL + p.path
                }
            })
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { getProduct };
