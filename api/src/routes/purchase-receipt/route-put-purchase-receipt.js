const { Router } = require('express');
const { editPurchaseReceipt } = require('../../controllers/purchase-receipt/controller-put-purchase-receipt');
const idValidationRules = require('../../controllers/validations/id-validation-rules');
const statusValidationRules = require('../../controllers/purchase-receipt/status-validation-rules');
const validateRules = require('../../middlewares/validate-rules');

module.exports = Router().put('/:id',
    idValidationRules(),
    validateRules,
    statusValidationRules(),
    validateRules,
    editPurchaseReceipt
);

