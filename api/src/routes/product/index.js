const { Router } = require('express');
const getProducts = require('./route-get-products');
const getProduct = require('./route-get-product');
const postProduct = require('./route-post-product');
const putProduct = require('./route-put-product');

const router = Router();
router.use('/', getProducts);
router.use('/', getProduct);
router.use('/', postProduct);
router.use('/', putProduct);

module.exports = router;
