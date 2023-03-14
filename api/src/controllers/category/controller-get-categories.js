const { Op } = require('sequelize');
const { Category } = require('../../db');
const { getPagination } = require('../../utils/utils');
const httpStatusCodes = require('../../utils/http-status-codes');

const getCategories = async (req, res, next) => {
    try {
        const { page, size, sort, filter } = req.query;

        const options = { ...getPagination(page, size) };

        if (sort) {
            options.order = [JSON.parse(sort)];
        }
    
        // Filter by name
        if (filter && Object.keys(JSON.parse(filter)).length > 0) {
            const filterObj = JSON.parse(filter);
            const nameCondition = filterObj.name ? { [Op.iLike]: `${JSON.parse(filter).name}%` } : { [Op.iLike]: '%' };
            options.where = { name: nameCondition };
        }
    
        let categories = await Category.findAndCountAll(options);
    

        res.status(httpStatusCodes.OK).json(categories);
    } catch (error) {
        next(error)
    }
}

module.exports = { getCategories };
