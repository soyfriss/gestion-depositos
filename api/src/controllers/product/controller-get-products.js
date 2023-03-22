const { Op } = require('sequelize');
const { Product, Category } = require('../../db');
const { getPagination } = require('../../utils/utils');
const httpStatusCodes = require('../../utils/http-status-codes');

const getProducts = async (req, res, next) => {
    try {
        const { page, size, sort, filter } = req.query;

        const options = {
            ...getPagination(page, size),
            include: [{
                model: Category,
                through: {
                    attributes: []
                }
            }],
            distinct: true,
        };

        if (sort) {
            options.order = [JSON.parse(sort)];
        }

        if (filter && Object.keys(JSON.parse(filter)).length > 0) {
            const filterObj = JSON.parse(filter);
            const conditions = [];

            if (filterObj.id) {
                conditions.push({ id: { [Op.in]: filterObj.id } });
            }
            if (filterObj.name) {
                conditions.push({ name: { [Op.iLike]: `${filterObj.name}%` } });
            }
            if (filterObj.status) {
                conditions.push({ status: { [Op.eq]: filterObj.status } });
            }

            if (filterObj.categories) {
                options.include[0].where = { id: { [Op.in]: filterObj.categories } };
            }

            options.where = { [Op.and]: conditions };
        }

        let products = await Product.findAndCountAll(options);

        // Search again to get all categories from a product if there are category filters
        if (options.include[0].where) {
            const productIds = products.rows.map(p => p.id);
    
            options.where = { id: { [Op.in]: productIds } };
            options.include = [{
                model: Category,
                through: {
                    attributes: []
                }
            }];
    
            products = await Product.findAndCountAll(options);
        }

        res.status(httpStatusCodes.OK).json(products);
    } catch (error) {
        next(error);
    }
}

module.exports = { getProducts };
