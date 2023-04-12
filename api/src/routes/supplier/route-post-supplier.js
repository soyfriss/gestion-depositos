const { Router } = require('express');
const { createSupplier } = require('../../controllers/supplier/controller-post-supplier');
const validationRules = require('../../controllers/supplier/validation-rules');
const validateRules = require('../../middlewares/validate-rules');
const statusValidationRules = require('../../controllers/validations/status-validation-rules');

// module.exports = Router()
//     .post(
//         '/',
//         validationRules(),
//         validateRules,
//         createEmployee
//     );

module.exports = Router()
    .post(
        '/',
        statusValidationRules(),
        validateRules,
        validationRules(),
        validateRules,
        createSupplier
    );
