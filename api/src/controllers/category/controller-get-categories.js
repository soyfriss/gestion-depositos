const { Op } = require('sequelize');
const { Category } = require('../../db');
const { getPagination } = require('../../utils/utils');

const getCategories = async (page, size, sort, filter) => {
    const options = { ...getPagination(page, size) };

    if (sort) {
        options.order = [JSON.parse(sort)];
    }

    // Filter by name
    if (filter && Object.keys(JSON.parse(filter)).length > 0) {
        const filterObj = JSON.parse(filter);
        const nameCondition = filterObj.name ? { [Op.iLike]: `${JSON.parse(filter).name}%` } : { [Op.iLike]: '%' };
        options.where = { name: nameCondition };
    }

    let categories = await Category.findAndCountAll(options);

    return categories;
}

module.exports = { getCategories };
