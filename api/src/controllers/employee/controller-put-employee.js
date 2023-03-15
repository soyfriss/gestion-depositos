const { Employee } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const editEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, email, phone, filenumber, status } = req.body;

        let employee = await Employee.findByPk(id);
        
        if (!employee) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: constants.ITEM_NOT_FOUND});
        }

        await employee.update({
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

module.exports = { editEmployee };