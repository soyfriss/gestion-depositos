const { Router } = require('express');
const { getEmployee } = require('../../controllers/employee/controller-get-employee');

// GET /categories/{id}
module.exports = Router().get('/:id', getEmployee);
