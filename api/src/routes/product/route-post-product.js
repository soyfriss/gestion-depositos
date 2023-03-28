const { Router } = require('express');
const { createProduct } = require('../../controllers/product/controller-post-product');
const validationRules = require('../../controllers/product/validation-rules');
const validateRules = require('../../middlewares/validate-rules');

module.exports = Router()
.post(
    '/',
    validationRules(),
    validateRules,
    createProduct
)
