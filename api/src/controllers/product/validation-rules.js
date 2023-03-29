const { body } = require('express-validator');
const constants = require('../../utils/constants');
const { isProductDuplicated } = require('./is-product-duplicated');
const { Category } = require('../../db');

const validationRules = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage(constants.FIELD_REQUIRED)
            .bail()
            .isLength({ max: 255 }).withMessage(constants.MAX_LENGTH_EXCEEDED)
            .bail()
            .custom(async (value, { req }) => {
                if (await isProductDuplicated(value, req.params.id)) {
                    return Promise.reject(constants.DUPLICATED_NAME)
                }
            })
            .bail(),
        body('description')
            .trim()
            .isLength({ max: 500 }).withMessage(constants.MAX_LENGTH_EXCEEDED)
            .bail(),
        body('categories')
            .custom(async (value) => {
                // Check type
                if (!Array.isArray(value)) {
                    return Promise.reject(constants.INCORRECT_TYPE);
                }
                // Check each category
                for (const categoryId of value) {
                    // category type
                    if (typeof categoryId !== 'number') {
                        return Promise.reject(constants.INVALID_ITEM_IN_LIST);
                    }
                    // Empty category
                    if (!categoryId) {
                        return Promise.reject(constants.EMPTY_ITEM_IN_LIST);
                    }
                    // Verify if temperament exists
                    const categoryInDB = await Category.findByPk(categoryId)
                    console.log('categoryInDB: ', categoryInDB);

                    if (!categoryInDB) {
                        return Promise.reject(`${categoryId}: ${constants.ITEM_NOT_IN_LIST}`);
                    }
                }
            })
    ]
}

module.exports = validationRules;
