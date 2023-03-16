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
            }]
        };

        if (sort) {
            options.order = [JSON.parse(sort)];
        }

        if (filter && Object.keys(JSON.parse(filter)).length > 0) {
            const filterObj = JSON.parse(filter);
            const idsCondition = filterObj.id ? { [Op.in]: filterObj.id } : { [Op.gt]: 0 };
            const nameCondition = filterObj.name ? { [Op.iLike]: `${filterObj.name}%` } : { [Op.iLike]: '%' };
            const statusCondition = filterObj.status ? { [Op.eq]: filterObj.status } : { [Op.in]: ['Active', 'Disabled'] };
            options.where = { [Op.and]: [{ id: idsCondition }, { name: nameCondition }, { status: statusCondition }] };
        }

        let products = await Product.findAndCountAll(options);

        res.status(httpStatusCodes.OK).json(products);
    } catch (error) {
        next(error);
    }

}

module.exports = { getProducts };
