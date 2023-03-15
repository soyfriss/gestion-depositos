const { Router } = require('express');
const categoryRouter = require('./category');
const productRouter = require('./product');

const router = Router();
router.use('/categories', categoryRouter);
router.use('/products', productRouter);

module.exports = router;
