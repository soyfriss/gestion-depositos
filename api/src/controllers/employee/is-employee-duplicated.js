const { Op } = require('sequelize');
const { Employee } = require('../../db');

const isEmployeeDuplicated = async (filenumber, id = 0) => {
    const options = {};
    const fileNumberCondition = { [Op.iLike]: `${filenumber}` };
    const idCondition = { [Op.ne]: id }
    options.where = { [Op.and]: [{ id: idCondition }, { filenumber: fileNumberCondition }] };

    let employees = await Employee.findAndCountAll(options);

    return (employees.count > 0);
}

module.exports = { isEmployeeDuplicated };
