const { body } = require('express-validator');
const constants = require('../../utils/constants');
const { isEmployeeDuplicated } = require('./is-employee-duplicated');


const validationRules = () => {
    return [
        body('firstname')
            .trim()
            .notEmpty().withMessage(constants.FIELD_REQUIRED)
            .bail()
            .isLength({ max: 255 }).withMessage(constants.MAX_LENGTH_EXCEEDED),
        body('lastname')
            .trim()
            .notEmpty().withMessage(constants.FIELD_REQUIRED)
            .bail()
            .isLength({ max: 255 }).withMessage(constants.MAX_LENGTH_EXCEEDED),
        body('email')
            .trim()
            .notEmpty().withMessage(constants.FIELD_REQUIRED)
            .bail()
            .isEmail().withMessage(constants.INVALID_DATA)
            .normalizeEmail(),
        body('phone')
            .trim()
            .notEmpty().withMessage(constants.FIELD_REQUIRED)
            .bail()
            .matches(/^\+?([0-9][ -]*){7,14}$/).withMessage(constants.INVALID_DATA),
        body('filenumber')
            .trim()
            .notEmpty().withMessage(constants.FIELD_REQUIRED)
            .bail()
            .isNumeric().withMessage(constants.INVALID_DATA)
            .bail()
            .custom(async (value, { req }) => {
                if (await isEmployeeDuplicated(value, req.params.id)) {
                    return Promise.reject(constants.DUPLICATED_FILENUMBER);
                }
            }),
    ]
}

module.exports = validationRules;
