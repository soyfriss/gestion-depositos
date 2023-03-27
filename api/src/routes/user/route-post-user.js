const { Router } = require('express');
const { createUser } = require('../../controllers/user/controller-post-user');
// const validationRules = require('../../controllers/employee/validation-rules');
// const validateRules = require('../../middlewares/validate-rules');

module.exports = Router()
    .post(
        '/',
        // validationRules(),
        // validateRules,
        createUser
    );