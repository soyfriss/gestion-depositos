const { Router } = require('express');
const { getUserByUserName } = require('../../controllers/user/controller-get-user-by-username');

// GET /user/{id}
module.exports = Router().get('/:username', getUserByUserName);
