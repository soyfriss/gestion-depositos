const { Router } = require('express');
const { createUser } = require('../../controllers/user/controller-post-user');
const validationRules = require('../../controllers/user/validation-rules');
const validateRules = require('../../middlewares/validate-rules');
const statusValidationRules = require('../../controllers/validations/status-validation-rules');

module.exports = Router()
    .post(
        '/',
        statusValidationRules(),
        validateRules,
        validationRules(),
        validateRules,
        createUser
    );