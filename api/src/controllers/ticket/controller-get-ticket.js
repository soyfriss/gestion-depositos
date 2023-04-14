const axios = require('axios');
const httpStatusCodes = require('../../utils/http-status-codes');
const { getTicketArticles } = require('./get-ticket-articles');
require('dotenv').config();
const {
    TICKET_SYSTEM_HOSTNAME, TICKET_SYSTEM_TOKEN
} = process.env;

const getTicket = async (req, res, next) => {
    try {
        const { id } = req.params;

        let baseURL = `${TICKET_SYSTEM_HOSTNAME}/api/v1/tickets/${id}&expand=true`;

        const config = {
            headers: { Authorization: `Bearer ${TICKET_SYSTEM_TOKEN}` }
        };

        let response = await axios.get(baseURL, config);
        const ticket = {
            id,
            ticketDate: response.data.created_at,
            customerId: response.data.customer_id,
            customer: response.data.customer,
            title: response.data.title,
            articles: await getTicketArticles(id)
        }
        // get articles
        // baseURL = `${TICKET_SYSTEM_HOSTNAME}/api/v1/ticket_articles/by_ticket/${id}`;
        // response = await axios.get(baseURL, config);
        // ticket.articles = response.data.map(article => {
        //     return {
        //         id: article.id,
        //         articleDate: article.created_at,
        //         from: article.from,
        //         to: article.to,
        //         subject: article.subject,
        //         body: article.body
        //     }
        // })

        res.status(httpStatusCodes.OK).json(ticket);
    } catch (error) {
        next(error)
    }
}

module.exports = { getTicket };
