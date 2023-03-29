const { Router } = require('express');
const { createProduct } = require('../../controllers/product/controller-post-product');
const validationRules = require('../../controllers/product/validation-rules');
const validateRules = require('../../middlewares/validate-rules');
const statusValidationRules = require('../../controllers/validations/status-validation-rules');


module.exports = Router()
.post(
    '/',
    statusValidationRules(),
    validateRules,
    validationRules(),
    validateRules,
    createProduct
)
