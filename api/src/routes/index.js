const { Router } = require('express');
const categoryRouter = require('./category');
const productRouter = require('./product');
const employeeRouter = require('./employee');
const userRouter = require('./user');

const router = Router();
router.use('/categories', categoryRouter);
router.use('/employees', employeeRouter);
router.use('/products', productRouter);
router.use('/users', userRouter);

module.exports = router;
