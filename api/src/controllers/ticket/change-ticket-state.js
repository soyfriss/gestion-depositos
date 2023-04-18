const axios = require('axios');
require('dotenv').config();
const {
    TICKET_SYSTEM_HOSTNAME, TICKET_SYSTEM_TOKEN
} = process.env;

const changeTicketState = async (ticketId, state) => {
    const baseURL = `${TICKET_SYSTEM_HOSTNAME}/api/v1/tickets/${ticketId}`;
    const config = {
        headers: { Authorization: `Bearer ${TICKET_SYSTEM_TOKEN}` }
    };

    await axios.put(baseURL, { state }, config);
}

module.exports = { changeTicketState };
