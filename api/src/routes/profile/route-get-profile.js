const { Router } = require('express');
const { getProfile } = require('../../controllers/profile/controller-get-profile');

// GET /profile/{id}
module.exports = Router().get('/:id', getProfile);