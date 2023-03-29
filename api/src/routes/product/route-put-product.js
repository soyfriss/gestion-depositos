const { Router } = require('express');
const { editProduct } = require('../../controllers/product/controller-put-product');
const validationRules = require('../../controllers/product/validation-rules');
const idValidationRules = require('../../controllers/validations/id-validation-rules');
const validateRules = require('../../middlewares/validate-rules');

module.exports = Router()
.put(
    '/:id',
    idValidationRules(),
    validateRules,
    validationRules(),
    validateRules,
    editProduct
);
