const { Router } = require('express');
const { editDeliveryNote } = require('../../controllers/delivery-note/controller-put-delivery-note');
const idValidationRules = require('../../controllers/validations/id-validation-rules');
const statusValidationRules = require('../../controllers/delivery-note/status-validation-rules');
const validateRules = require('../../middlewares/validate-rules');

module.exports = Router().put('/:id',
    idValidationRules(),
    validateRules,
    statusValidationRules(),
    validateRules,
    editDeliveryNote
);
