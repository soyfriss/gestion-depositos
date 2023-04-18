const { Router } = require('express');
const { getTicket } = require('../../controllers/ticket/controller-get-ticket');

// GET /tickets/{id}
module.exports = Router().get('/:id', getTicket);
