const { Router } = require('express');
const { createUser } = require('../../controllers/user/controller-post-user');

module.exports = Router()
    .post(
        '/',
        createUser
    );