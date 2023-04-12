const { Router } = require('express');
const { getSupplier } = require('../../controllers/supplier/controller-get-supplier');

// GET /suppliers/{id}
module.exports = Router().get('/:id', getSupplier);
