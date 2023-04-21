const { Router } = require('express');
const { getInventoryCounts } = require('../../controllers/inventory-count/controller-get-inventory-counts');

// GET /inventory-counts
module.exports = Router().get('/', getInventoryCounts);
