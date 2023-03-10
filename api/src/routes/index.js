const { Router } = require('express');
const categoryRouter = require('./category');

const router = Router();
router.use('/categories', categoryRouter);

module.exports = router;
