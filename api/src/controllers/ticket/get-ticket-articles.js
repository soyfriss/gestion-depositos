const axios = require('axios');
require('dotenv').config();
const {
    TICKET_SYSTEM_HOSTNAME, TICKET_SYSTEM_TOKEN
} = process.env;

const getTicketArticles = async (ticketId) => {
    const baseURL = `${TICKET_SYSTEM_HOSTNAME}/api/v1/ticket_articles/by_ticket/${ticketId}`;
    const config = {
        headers: { Authorization: `Bearer ${TICKET_SYSTEM_TOKEN}` }
    };

    response = await axios.get(baseURL, config);
    const articles = response.data.map(article => {
        return {
            id: article.id,
            articleDate: article.created_at,
            from: article.from,
            to: article.to,
            subject: article.subject,
            body: article.body
        }
    })

    return articles;
}

module.exports = { getTicketArticles };
