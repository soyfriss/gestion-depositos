const { Router } = require('express');
const { editCategory } = require('../../controllers/category/controller-put-category');
const validationRules = require('../../controllers/category/validation-rules');
const idValidationRules = require('../../controllers/category/id-validation-rules');
const validateRules = require('../../middlewares/validate-rules');

// PUT /categories/{id}
module.exports = Router()
    .put(
        '/:id',
        idValidationRules(),
        validateRules,
        validationRules(),
        validateRules,
        editCategory
    );
