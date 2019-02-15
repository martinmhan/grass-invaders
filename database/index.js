const { Client } = require('pg');
const config = require('./dbConfig.js');

const client = new Client(config);
client.connect();

module.exports = client;
