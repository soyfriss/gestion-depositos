const { Router } = require('express');
const { getUsers } = require('../../controllers/user/controller-get-users');

// GET /users/{id}
module.exports = Router().get('/', getUsers);
