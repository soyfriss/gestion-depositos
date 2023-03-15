const { Router } = require('express');
const categoryRouter = require('./category');
const employeeRouter = require('./employee');

const router = Router();
router.use('/categories', categoryRouter);
router.use('/employees', employeeRouter);

module.exports = router;
