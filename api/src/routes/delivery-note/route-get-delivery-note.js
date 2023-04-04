const { Router } = require('express');
const { getDeliveryNote } = require('../../controllers/delivery-note/controller-get-delivery-note');
const idValidationRules = require('../../controllers/validations/id-validation-rules');
const validateRules = require('../../middlewares/validate-rules');

// GET /delivery-notes/{id}
module.exports = Router().get('/:id',
    idValidationRules(false),
    validateRules,
    getDeliveryNote
);
