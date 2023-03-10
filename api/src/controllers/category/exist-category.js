const { Op } = require('sequelize');
const { Category } = require('../../db');

const existCategory = async (name, id = 0) => {
    const options = {};
    const nameCondition = { [Op.iLike]: `${name}` };
    const idCondition = { [Op.ne]: id }
    options.where = { [Op.and]: [{ id: idCondition }, { name: nameCondition }] };

    let categories = await Category.findAndCountAll(options);

    return (categories.count > 0);
}

module.exports = { existCategory };
