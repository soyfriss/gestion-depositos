const { body } = require('express-validator');
const constants = require('../../utils/constants');
const { isCategoryDuplicated } = require('./is-category-duplicated');

const validationRules = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage(constants.FIELD_REQUIRED)
            .bail()
            .isLength({ max: 255 }).withMessage(constants.MAX_LENGTH_EXCEEDED)
            .bail()
            .custom(async (value, { req }) => {
                if (await isCategoryDuplicated(value, req.params.id)) {
                    return Promise.reject(constants.DUPLICATED_NAME);
                }
            }),
    ]
}

module.exports = validationRules;
