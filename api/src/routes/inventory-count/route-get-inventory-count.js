const { Router } = require('express');
const { getInventoryCount } = require('../../controllers/inventory-count/controller-get-inventory-count');
const idValidationRules = require('../../controllers/validations/id-validation-rules');
const validateRules = require('../../middlewares/validate-rules');

// GET /inventory-counts/{id}
module.exports = Router().get('/:id',
    idValidationRules(false),
    validateRules,
    getInventoryCount
);

