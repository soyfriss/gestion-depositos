const { Router } = require('express');
const { getSuppliers } = require('../../controllers/supplier/controller-get-suppliers')
 
// GET /suppliers
module.exports = Router().get('/', getSuppliers);
