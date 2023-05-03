const { Router } = require('express');
const getInventoryCounts = require('./route-get-inventory-counts');
const getInventoryCount = require('./route-get-inventory-count');
const createInventoryCount = require('./route-post-inventory-count');
const editInventoryCount = require('./route-put-inventory-count');

const router = Router();
router.use('/', getInventoryCounts);
router.use('/', getInventoryCount);
router.use('/', createInventoryCount);
router.use('/', editInventoryCount);

module.exports = router;
