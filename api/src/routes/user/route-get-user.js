const { Router } = require('express');
const { getUser } = require('../../controllers/user/controller-get-user');

// GET /user/{id}
module.exports = Router().get('/:id', getUser);
