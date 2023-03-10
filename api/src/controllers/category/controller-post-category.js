const { Category } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const ValidationError = require('../../utils/validation-error');
const validateCategory = require('./validate-category');

const createCategory = async (name) => {
    // Validate data
    const errors = await validateCategory({ name });
    if (errors) {
        throw new ValidationError('Validation error', errors, httpStatusCodes.BAD_REQUEST);
    }

    const category = await Category.create({
        name
    });

    return category;
}

module.exports = { createCategory };
