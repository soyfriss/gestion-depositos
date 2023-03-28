const { param } = require('express-validator');
const constants = require('../../utils/constants');

const idValidationRules = (checkBody = true) => {
    const rules = [
        param('id')
            .trim()
            .notEmpty().withMessage(constants.FIELD_REQUIRED)
            .bail()
            .isNumeric().withMessage(constants.INCORRECT_TYPE)
            .bail()
    ];

    if (checkBody) {
        rules.push(
            param('id')
                .custom(async (value, { req }) => {
                    if (value !== req.body.id + '') {
                        return Promise.reject(constants.INVALID_DATA);
                    }
                })
        )
    }
    return rules;
}

module.exports = idValidationRules;
