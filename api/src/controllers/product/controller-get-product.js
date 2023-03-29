const { Product, Category } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

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
                }]
            }
        );

        res.status(httpStatusCodes.OK).json({
            id: product.id,
            name: product.name,
            description: product.description,
            stock: product.stock,
            status: product.status,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            categories: product.Categories.map(c => c.id)
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { getProduct };
