const { Router } = require('express');
const { getProduct } = require('../../controllers/product/controller-get-product');
const idValidationRules = require('../../controllers/validations/id-validation-rules');
const validateRules = require('../../middlewares/validate-rules');

// GET /products/{id}
module.exports = Router()
    .get(
        '/:id',
        idValidationRules(false),
        validateRules,
        getProduct
    );
