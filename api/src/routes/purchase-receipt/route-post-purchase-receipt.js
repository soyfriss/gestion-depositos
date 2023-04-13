const { Router } = require('express');
const { createPurchaseReceipt } = require('../../controllers/purchase-receipt/controller-post-purchase-receipt');
const validationRules = require('../../controllers/purchase-receipt/validation-rules');
const statusValidationRules = require('../../controllers/purchase-receipt/status-validation-rules');
const validateRules = require('../../middlewares/validate-rules');

module.exports = Router().post('/',
    validationRules(),
    validateRules,
    statusValidationRules(),
    validateRules,
    createPurchaseReceipt
);
