const { Router } = require('express');
const getSuppliers = require('./route-get-suppliers');
const getSupplier = require('./route-get-supplier');
const postSupplier = require('./route-post-supplier');
const putSupplier = require('./route-put-supplier');

const router = Router();
router.use('/', getSuppliers);
router.use('/', getSupplier);
router.use('/', postSupplier);
router.use('/', putSupplier);

module.exports = router;
