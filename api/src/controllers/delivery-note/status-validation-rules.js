const { body } = require('express-validator');
const constants = require('../../utils/constants');
const Status = require('./status-enum');

const statusValidationRules = () => {
    return [
        body('status')
            .isIn(Object.keys(Status)).withMessage(constants.INVALID_DATA)
    ]
}

module.exports = statusValidationRules;

