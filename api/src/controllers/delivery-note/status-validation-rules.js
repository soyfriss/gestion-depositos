const { body } = require('express-validator');
const constants = require('../../utils/constants');

const statusValidationRules = () => {
    return [
        body('status')
            .isIn(['Completed', 'Canceled']).withMessage(constants.INVALID_DATA)
    ]
}

module.exports = statusValidationRules;
