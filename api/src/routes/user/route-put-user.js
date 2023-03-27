const { Router } = require('express');
const { editUser } = require('../../controllers/user/controller-put-user');

module.exports = Router()
    .put(
        '/:id',
        editUser
    );
