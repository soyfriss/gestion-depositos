const { Router } = require('express');
const getEmployees = require('./route-get-employees');
const getEmployee = require('./route-get-employee');
const postEmployee = require('./route-post-employee');
const putEmployee = require('./route-put-employee');

const router = Router();
router.use('/', getEmployees);
router.use('/', getEmployee);
router.use('/', postEmployee);
router.use('/', putEmployee);

module.exports = router;
