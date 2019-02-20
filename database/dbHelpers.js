const client = require('./index.js');

module.exports = {
  selectScores: () => client.query('SELECT TOP 10 * FROM scores;'),
  insertScore: (username, score) => client.query(`INSERT INTO scores (username, score) VALUES (${username}, ${score});`),
};
