const { Router } = require('express');
const { getUsers } = require('../../controllers/user/controller-get-users');

// GET /categories/{id}
module.exports = Router().get('/', getUsers);
