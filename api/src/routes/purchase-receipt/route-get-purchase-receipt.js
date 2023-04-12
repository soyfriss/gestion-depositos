const { Router } = require('express');
const { getPurchaseReceipt } = require('../../controllers/purchase-receipt/controller-get-purchase-receipt');
const idValidationRules = require('../../controllers/validations/id-validation-rules');
const validateRules = require('../../middlewares/validate-rules');

// GET /purchase-receipts/{id}
module.exports = Router().get('/:id',
    idValidationRules(false),
    validateRules,
    getPurchaseReceipt
);

