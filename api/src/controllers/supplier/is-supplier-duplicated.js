const { Op } = require('sequelize');
const { Supplier } = require('../../db');

const isSupplierDuplicated = async (name, id = 0) => {
    const options = {};
    const nameCondition = { [Op.iLike]: `${name}` };
    const idCondition = { [Op.ne]: id }
    options.where = { [Op.and]: [{ id: idCondition }, { name: nameCondition }] };

    let suppliers = await Supplier.findAndCountAll(options);

    return (suppliers.count > 0);
}

module.exports = { isSupplierDuplicated };
