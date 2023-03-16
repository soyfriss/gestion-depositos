const { Router } = require('express');
const getProducts = require('./route-get-products');

const router = Router();
router.use('/', getProducts);

module.exports = router;
