const { Router } = require('express');
const getDeliveryNotes = require('./route-get-delivery-notes');
const getDeliveryNote = require('./route-get-delivery-note');
const createDeliveryNote = require('./route-post-delivery-note');
const editDeliveryNote = require('./route-put-delivery-note');

const router = Router();
router.use('/', getDeliveryNotes);
router.use('/', getDeliveryNote);
router.use('/', createDeliveryNote);
router.use('/', editDeliveryNote);

module.exports = router;
