const { Router } = require('express');
const { createDeliveryNote } = require('../../controllers/delivery-note/controller-post-delivery-note');
const validationRules = require('../../controllers/delivery-note/validation-rules');
const validateRules = require('../../middlewares/validate-rules');

module.exports = Router().post('/',
    validationRules(),
    validateRules,
    createDeliveryNote
);
