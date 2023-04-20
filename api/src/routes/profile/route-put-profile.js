const { Router } = require('express');
const { editProfile } = require('../../controllers/profile/controller-put-profile');
const idValidationRules = require('../../controllers/validations/id-validation-rules');
const validateRules = require('../../middlewares/validate-rules');
const validationRules = require('../../controllers/profile/validation-rules');

// PUT /profile/{id}
module.exports = Router()
    .put(
        '/:id',
        idValidationRules(),
        validateRules,
        validationRules(),
        validateRules,
        editProfile
    );