const { Router } = require('express');
const { createInventoryCount } = require('../../controllers/inventory-count/controller-post-inventory-count');

// POST /inventory-count
module.exports = Router().post('/', createInventoryCount);
