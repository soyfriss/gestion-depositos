const { Router } = require('express');
const getInventoryCounts = require('./route-get-inventory-counts');

const router = Router();
router.use('/', getInventoryCounts);

module.exports = router;
