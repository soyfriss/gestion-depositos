const { Employee } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const createEmployee = async (req, res, next) => {
    try {
        const { firstname, lastname, email, phone, filenumber, status } = req.body;
        const employee = await Employee.create({
            firstname,
            lastname, 
            email, 
            phone, 
            filenumber, 
            status
        });

        res.status(httpStatusCodes.OK).json(employee);
    } catch (error) {
        next(error);
    }
}

module.exports = { createEmployee };
