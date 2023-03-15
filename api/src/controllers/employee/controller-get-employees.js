const { Op } = require('sequelize');
const { Employee } = require('../../db');
const { getPagination } = require('../../utils/utils');
const httpStatusCodes = require('../../utils/http-status-codes');

const getEmployees = async (req, res, next) => {
    try {
        const { page, size, sort, filter } = req.query;

        const options = { ...getPagination(page, size) };

        if (sort) {
            options.order = [JSON.parse(sort)];
        }
    
        // Filter by firstname
        if (filter && Object.keys(JSON.parse(filter)).length > 0) {
            const filterObj = JSON.parse(filter);
            const firstNameCondition = filterObj.firstName ? { [Op.iLike]: `${JSON.parse(filter).firstName}%` } : { [Op.iLike]: '%' };
            options.where = { firstname: firstNameCondition };
        }
    
        let employees = await Employee.findAndCountAll(options);
    

        res.status(httpStatusCodes.OK).json(employees);
    } catch (error) {
        next(error)
    }
}

module.exports = { getEmployees };