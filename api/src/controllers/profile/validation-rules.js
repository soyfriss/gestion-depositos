const { body } = require('express-validator');
const constants = require('../../utils/constants');
const { isUserDuplicated } = require('../user/is-user-duplicated');


const validationRules = () => {
    return [
        body('username')
            .trim()
            .notEmpty().withMessage(constants.FIELD_REQUIRED)
            .bail()
            .isLength({ max: 255 }).withMessage(constants.MAX_LENGTH_EXCEEDED)
            .bail()
            .custom(async (value, { req }) => {
                if (await isUserDuplicated(value, req.params.id)) {
                    return Promise.reject(constants.DUPLICATED_NAME);
                }
            }),
        (req, res, next) => {
            if (req.body.hasOwnProperty('passwordEdit')) {
                body('passwordEdit')
                    .isStrongPassword({
                      minLength: 6,
                      minLowercase: 1,
                      minUppercase: 1,
                      minNumbers: 1,
                      minSymbols: 1,
                      returnScore: false,
                      pointsPerUnique: 1,
                      pointsPerRepeat: 0.5,
                      pointsForContainingLower: 10,
                      pointsForContainingUpper: 10,
                      pointsForContainingNumber: 10,
                      pointsForContainingSymbol: 10,
                    }).withMessage(constants.INVALID_PASSWORD)(req, res, next);
            } else {
                next();
            }
        }
    ]
}

module.exports = validationRules;
