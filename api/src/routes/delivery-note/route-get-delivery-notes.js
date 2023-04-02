const { Router } = require('express');
const { getDeliveryNotes } = require('../../controllers/delivery-note/controller-get-delivery-notes');

// GET /delivery-notes
module.exports = Router().get('/', getDeliveryNotes);
