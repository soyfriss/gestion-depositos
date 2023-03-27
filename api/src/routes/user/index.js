const { Router } = require('express');
const getUsers = require('./route-get-users');
const getUser = require('./route-get-user');
const getUserByUserName = require('./route-get-user-by-username');

const router = Router();
router.use('/', getUsers);
router.use('/', getUser);
router.use('/user', getUserByUserName);

module.exports = router;
