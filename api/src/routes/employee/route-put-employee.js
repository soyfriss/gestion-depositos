const { Router } = require('express');
const { editEmployee } = require('../../controllers/employee/controller-put-employee');
// const validationRules = require('../../controllers/category/validation-rules');
// const idValidationRules = require('../../controllers/category/id-validation-rules');
const validateRules = require('../../middlewares/validate-rules');

// PUT /categories/{id}
// module.exports = Router()
//     .put(
//         '/:id',
//         idValidationRules(),
//         validateRules,
//         validationRules(),
//         validateRules,
//         editCategory
//     );

module.exports = Router()
    .put(
        '/:id',
        validateRules,
        editEmployee
    );
