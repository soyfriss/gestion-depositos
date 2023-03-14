const { Router } = require('express');
const { getCategory } = require('../../controllers/category/controller-get-category');

// GET /categories/{id}
module.exports = Router().get('/:id', getCategory);
