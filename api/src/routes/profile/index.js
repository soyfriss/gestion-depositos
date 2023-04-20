const { Router } = require('express');
const putProfile = require('./route-put-profile');
const getProfile = require('./route-get-profile');

const router = Router();
router.use('/', getProfile);
router.use('/', putProfile);

module.exports = router;
