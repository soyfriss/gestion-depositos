const { Router } = require('express');
const getTickets = require('./route-get-tickets');
const getTicket = require('./route-get-ticket');

const router = Router();
router.use('/', getTickets);
router.use('/', getTicket);

module.exports = router;
