const axios = require('axios');
require('dotenv').config();
const {
    TICKET_SYSTEM_HOSTNAME, TICKET_SYSTEM_TOKEN
} = process.env;

const createTicketArticle = async (ticketId, body) => {
    const baseURL = `${TICKET_SYSTEM_HOSTNAME}/api/v1/ticket_articles`;
    const config = {
        headers: { Authorization: `Bearer ${TICKET_SYSTEM_TOKEN}` }
    };

    const article = {
        ticket_id: ticketId,
        body,
        content_type: "text/html",
        type: "note",
        internal: false,
        sender: "Agent",
    }

    await axios.post(baseURL, article, config);
}

module.exports = { createTicketArticle };
