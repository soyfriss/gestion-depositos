const { Router } = require('express');
const getUsers = require('./route-get-users');

const router = Router();
router.use('/', getUsers);

module.exports = router;
