const { Router } = require('express');
const { getEmployees } = require('../../controllers/employee/controller-get-employees');

// GET /categories
module.exports = Router().get('/', getEmployees);
