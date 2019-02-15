const { Client } = require('pg');
const config = require('')

const client = new Client(config);
client.connect();

module.exports = client;
