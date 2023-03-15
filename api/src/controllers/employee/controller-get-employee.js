const { Employee } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const getEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;

        let employee = await Employee.findByPk(id);

        res.status(httpStatusCodes.OK).json(employee);
        
    } catch (error) {
        next(error);
    }
}

module.exports = { getEmployee };
