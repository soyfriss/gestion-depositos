const { Router } = require('express');
const { editEmployee } = require('../../controllers/employee/controller-put-employee');
const validationRules = require('../../controllers/employee/validation-rules');
const idValidationRules = require('../../controllers/employee/id-validation-rules');
const validateRules = require('../../middlewares/validate-rules');

module.exports = Router()
    .put(
        '/:id',
        idValidationRules(),
        validateRules,
        validationRules(),
        validateRules,
        editEmployee
    );
