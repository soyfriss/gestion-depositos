const { matchedData, validationResult } = require('express-validator');
const httpStatusCodes = require('../utils/http-status-codes');

const validateRules = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        req.matchedData = matchedData(req);
        return next();
    }

    const objError = {};
    errors.array().map(err => objError[err.param] = err.msg);

    return res.status(httpStatusCodes.BAD_REQUEST).json(objError);
}

module.exports = validateRules;
