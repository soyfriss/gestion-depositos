const { Router } = require('express');
const { editInventoryCount } = require('../../controllers/inventory-count/controller-put-inventory-count');
const idValidationRules = require('../../controllers/validations/id-validation-rules');
const statusValidationRules = require('../../controllers/delivery-note/status-validation-rules');
const validateRules = require('../../middlewares/validate-rules');

// PUT /inventory-counts
module.exports = Router().put('/:id',
    idValidationRules(),
    validateRules,
    statusValidationRules(),
    validateRules,
    editInventoryCount
);
