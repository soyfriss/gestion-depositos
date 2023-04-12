const { body } = require('express-validator');
const constants = require('../../utils/constants');
const { isSupplierDuplicated } = require('./is-supplier-duplicated');


const validationRules = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage(constants.FIELD_REQUIRED)
            .bail()
            .isLength({ max: 255 }).withMessage(constants.MAX_LENGTH_EXCEEDED)
            .bail()
            .custom(async (value, { req }) => {
                if (await isSupplierDuplicated(value, req.params.id)) {
                    return Promise.reject(constants.DUPLICATED_NAME);
                }
            }),
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
    ]
}

module.exports = validationRules;
