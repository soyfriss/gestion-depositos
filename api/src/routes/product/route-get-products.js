const { Router } = require('express');
const { getProducts } = require('../../controllers/product/controller-get-products');

// GET products
module.exports = Router().get('/', getProducts);
