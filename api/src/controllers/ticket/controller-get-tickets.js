const axios = require('axios');
const httpStatusCodes = require('../../utils/http-status-codes');
const { getTicketArticles } = require('./get-ticket-articles');
require('dotenv').config();
const {
    TICKET_SYSTEM_HOSTNAME, TICKET_SYSTEM_TOKEN
} = process.env;

// http://mesadeayuda.villaconstitucion.gob.ar/api/v1/tickets/search?query=state.name:‘open’%20AND%20(customer.lastname:‘Farina’%20OR%20title:'Cableado')
// ?page=1&per_page=5
// ?sort_by={column name}

const getTickets = async (req, res, next) => {
    try {
        const { page, size, sort, filter } = req.query;

        let baseURL = `${TICKET_SYSTEM_HOSTNAME}/api/v1/tickets/search?query=state.name:'open'&expand=true&page=${Number(page) + 1}&per_page=${size}`;

        const config = {
            headers: { Authorization: `Bearer ${TICKET_SYSTEM_TOKEN}` }
        };

        let response = await axios.get(baseURL, config);
        const tickets = [];
        for (const ticket of response.data) {
            tickets.push({
                id: ticket.id,
                ticketDate: ticket.created_at,
                number: ticket.number,
                customerId: ticket.customer_id,
                customer: ticket.customer,
                title: ticket.title,
                articles: await getTicketArticles(ticket.id)
            })
        }
        
        // check if there are more tickets
        let hasNextPage = false;
        baseURL = `${TICKET_SYSTEM_HOSTNAME}/api/v1/tickets/search?query=state.name:'open'&expand=true&page=${Number(page) + 2}&per_page=${size}`;
        response = await axios.get(baseURL, config);
        if (response.data.length) {
            hasNextPage = true;
        }

        res.status(httpStatusCodes.OK).json({
            count: tickets.length,
            hasNextPage,
            rows: tickets
        });
    } catch (error) {
        next(error)
    }
}

module.exports = { getTickets };
