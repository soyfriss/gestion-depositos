const { Router } = require('express');
const { getTickets } = require('../../controllers/ticket/controller-get-tickets');

// GET /tickets
module.exports = Router().get('/', getTickets);
