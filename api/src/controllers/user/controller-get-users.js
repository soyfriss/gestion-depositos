const { Op } = require('sequelize');
const { User } = require('../../db');
const { getPagination } = require('../../utils/utils');
const httpStatusCodes = require('../../utils/http-status-codes');

const getUsers = async (req, res, next) => {
    try {
        const { page, size, sort, filter } = req.query;

        const options = { ...getPagination(page, size) };

        if (sort) {
            options.order = [JSON.parse(sort)];
        }   

        if (filter && Object.keys(JSON.parse(filter)).length > 0) {
            const filterObj = JSON.parse(filter);
            const conditions = [];

            if (filterObj.id) {
                conditions.push({ id: { [Op.in]: filterObj.id } });
            }
            if (filterObj.userName) {
                conditions.push({ username: { [Op.iLike]: `${filterObj.userName}%` } });
            }
            if (filterObj.status) {
                conditions.push({ status: { [Op.eq]: filterObj.status } });
            }

            options.where = { [Op.and]: conditions };
        }
        let users = await User.findAndCountAll(options);
    
        res.status(httpStatusCodes.OK).json(users);
    } catch (error) {
        next(error)
    }
}

module.exports = { getUsers };