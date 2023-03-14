const { Router } = require('express');
const { getCategories } = require('../../controllers/category/controller-get-categories');

// GET /categories
module.exports = Router().get('/', getCategories);
