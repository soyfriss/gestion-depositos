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
    
        if (filter && Object.keys(JSON.parse(filter)).length > 0) {
            const filterObj = JSON.parse(filter);
            
            const firstNameCondition = filterObj.firstName ? { [Op.iLike]: `${JSON.parse(filter).firstName}%` } : { [Op.iLike]: '%' };
            const lastNameCondition = filterObj.lastName ? { [Op.iLike]: `${JSON.parse(filter).lastName}%` } : { [Op.iLike]: '%' };
            const emailCondition = filterObj.email ? { [Op.iLike]: `${JSON.parse(filter).email}%` } : { [Op.iLike]: '%' };
            const phoneCondition = filterObj.phone ? { [Op.iLike]: `${JSON.parse(filter).phone}%` } : { [Op.iLike]: '%' };
            const fileNumberCondition = filterObj.fileNumber ? { [Op.iLike]: `${JSON.parse(filter).fileNumber}%` } : { [Op.iLike]: '%' };

            options.where = { [Op.and]: [{ firstname: firstNameCondition }, { lastname: lastNameCondition }, { email: emailCondition }, { phone: phoneCondition }, { filenumber: fileNumberCondition }]};
        }
    
        let employees = await Employee.findAndCountAll(options);
    

        res.status(httpStatusCodes.OK).json(employees);
    } catch (error) {
        next(error)
    }
}

module.exports = { getEmployees };