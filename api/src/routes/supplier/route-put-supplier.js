const { Router } = require('express');
const { editSupplier } = require('../../controllers/supplier/controller-put-supplier');
const validationRules = require('../../controllers/supplier/validation-rules');
const idValidationRules = require('../../controllers/validations/id-validation-rules');
const statusValidationRules = require('../../controllers/validations/status-validation-rules');
const validateRules = require('../../middlewares/validate-rules');

module.exports = Router()
    .put(
        '/:id',
        idValidationRules(),
        validateRules,
        statusValidationRules(),
        validateRules,
        validationRules(),
        validateRules,
        editSupplier
    );
