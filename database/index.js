const { Pool } = require('pg');
const config = require('./db.config.js');

const pool = new Pool(config);

module.exports = pool;
