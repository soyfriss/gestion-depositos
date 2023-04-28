const { Router } = require('express');
const getInventoryCounts = require('./route-get-inventory-counts');
const createInventoryCount = require('./route-post-inventory-count');

const router = Router();
router.use('/', getInventoryCounts);
router.use('/', createInventoryCount);

module.exports = router;
