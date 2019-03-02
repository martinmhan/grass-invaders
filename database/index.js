const { Pool } = require('pg');
const config = require('./dbConfig.js');

const pool = new Pool(config);

module.exports = pool;
