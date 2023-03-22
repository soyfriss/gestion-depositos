const { Router } = require('express');
const { createEmployee } = require('../../controllers/employee/controller-post-employee');
const validationRules = require('../../controllers/employee/validation-rules');
const validateRules = require('../../middlewares/validate-rules');

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
        validationRules(),
        validateRules,
        createEmployee
    );
