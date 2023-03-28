const { body } = require('express-validator');
const { constants } = require('../../utils/constants');

const statusValidationRules = () => {
    return [
        body('status')
            .not().isIn(['Active', 'Disabled']).withMessage(constants.INVALID_DATA)
    ]
}

module.exports = statusValidationRules;
