const { body } = require('express-validator');
const constants = require('../../utils/constants');

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
            .matches(^\+?[0-9\/.()-]{9,}$)

    ]
}

module.exports = validationRules;
