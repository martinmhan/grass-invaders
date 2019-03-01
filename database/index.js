const { Pool } = require('pg');
const config = require('./dbConfig.js');

const pool = new Pool(config);
pool.connect();

module.exports = pool;
