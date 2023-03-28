const { Router } = require('express');
const getUsers = require('./route-get-users');
const getUser = require('./route-get-user');
const getUserByUserName = require('./route-get-user-by-username');
const postUser = require('./route-post-user');
const putUser = require('./route-put-user');

const router = Router();
router.use('/', getUsers);
router.use('/', getUser);
router.use('/user', getUserByUserName);
router.use('/', postUser);
router.use('/', putUser);

module.exports = router;
