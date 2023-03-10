const { Category } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const ValidationError = require('../../utils/validation-error');
const validateCategory = require('./validate-category');

const editCategory = async (id, name) => {
    // Validate data
    const errors = await validateCategory({ id, name });
    if (errors) {
        throw new ValidationError(JSON.stringify(errors), httpStatusCodes.BAD_REQUEST);
    }

    let category = await Category.findByPk(id);

    await category.update({
        name
    });

    return category;
}

module.exports = { editCategory };
