const client = require('./index.js');

module.exports = {
  getTopScores: () => client.query('SELECT TOP 10 * FROM scores;'),
};
