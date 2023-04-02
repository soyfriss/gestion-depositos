const { Router } = require('express');
const { createDeliveryNote } = require('../../controllers/delivery-note/controller-post-delivery-note');

module.exports = Router().post('/',
    createDeliveryNote
);
