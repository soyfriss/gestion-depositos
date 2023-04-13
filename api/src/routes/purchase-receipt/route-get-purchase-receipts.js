const { Router } = require('express');
const { getPurchaseReceipts } = require('../../controllers/purchase-receipt/controller-get-purchase-receipts');

// GET /purchase-receipts
module.exports = Router().get('/', getPurchaseReceipts);
