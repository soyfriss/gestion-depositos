const { Router } = require('express');
const getPurchaseReceipts = require('./route-get-purchase-receipts');
const getPurchaseReceipt = require('./route-get-purchase-receipt');
const createPurchaseReceipt = require('./route-post-purchase-receipts');
const editPurchaseReceipt = require('./route-put-purchase-receipt');

const router = Router();
router.use('/', getPurchaseReceipts);
router.use('/', getPurchaseReceipt);
router.use('/', createPurchaseReceipt);
router.use('/', editPurchaseReceipt);

module.exports = router;

