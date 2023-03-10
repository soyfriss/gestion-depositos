const { Category } = require('../../db');

const getCategory = async (id) => {
    let category = await Category.findByPk(id);

    return category;
}

module.exports = { getCategory };
