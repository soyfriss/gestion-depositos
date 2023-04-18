const axios = require('axios');
const httpStatusCodes = require('../../utils/http-status-codes');
require('dotenv').config();
const {
    TICKET_SYSTEM_HOSTNAME, TICKET_SYSTEM_TOKEN
} = process.env;

const getTicketByNumber = async (number) => {
    const baseURL = `${TICKET_SYSTEM_HOSTNAME}/api/v1/tickets/search?query=number:${number}&expand=true`;
    const config = {
        headers: { Authorization: `Bearer ${TICKET_SYSTEM_TOKEN}` }
    };

    const response = await axios.get(baseURL, config);
    const ticket = {
        id: response.data[0].id,
        ticketNumber: number,
        ticketDate: response.data[0].created_at,
        customerId: response.data[0].customer_id,
        customer: response.data[0].customer,
        title: response.data[0].title,
    }

    return ticket;
}

module.exports = { getTicketByNumber };
