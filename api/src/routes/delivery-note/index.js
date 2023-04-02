const { Router } = require('express');
const getDeliveryNotes = require('./route-get-delivery-notes');
const createDeliveryNote = require('./route-post-delivery-note');

const router = Router();
router.use('/', getDeliveryNotes);
router.use('/', createDeliveryNote);

module.exports = router;
