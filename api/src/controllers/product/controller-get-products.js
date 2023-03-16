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
            distinct: true  // count value issue: https://stackoverflow.com/questions/64354987/findandcountall-count-gets-a-bigger-number-than-the-actual-returned-data
        };

        if (sort) {
            options.order = [JSON.parse(sort)];
        }

        if (filter && Object.keys(JSON.parse(filter)).length > 0) {
            const filters = [];
            const filterObj = JSON.parse(filter);
            if (filterObj.id) {
                filters.push({ id: { [Op.in]: filterObj.id } });
            }
            if (filterObj.name) {
                filters.push({ name: { [Op.iLike]: `${filterObj.name}%` } });
            }
            if (filterObj.status) {
                filters.push({ status: { [Op.eq]: filterObj.status } });
            }
            if (filters.length) {
                options.where = { [Op.and]: filters };
            }

            // Filter by categories
            if (filterObj.categories) {
                options.include[0].where = { id: { [Op.in]: filterObj.categories } };
            }
        }

        let products = await Product.findAndCountAll(options);

        res.status(httpStatusCodes.OK).json(products);
    } catch (error) {
        next(error);
    }

}

module.exports = { getProducts };
