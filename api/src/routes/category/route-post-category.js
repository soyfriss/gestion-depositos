const { Router } = require('express');
const { createCategory } = require('../../controllers/category/controller-post-category');
const validationRules = require('../../controllers/category/validation-rules');
const validateRules = require('../../middlewares/validate-rules');

module.exports = Router()
    .post(
        '/',
        validationRules(),
        validateRules,
        createCategory
    );
