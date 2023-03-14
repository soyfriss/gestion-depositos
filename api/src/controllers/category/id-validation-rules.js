const { param } = require('express-validator');
const constants = require('../../utils/constants');

const idValidationRules = () => {
    return [
        param('id')
            .trim()
            .notEmpty().withMessage(constants.FIELD_REQUIRED)
            .bail()
            .isNumeric().withMessage(constants.INCORRECT_TYPE)
            .bail()
            .custom(async (value, { req }) => {
                if (value !== req.body.id) {
                    return Promise.reject(constants.INVALID_DATA);
                }
            }),
    ]
}

module.exports = idValidationRules;
