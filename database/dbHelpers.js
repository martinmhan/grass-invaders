const client = require('./index.js');

module.exports = {
  selectScores: () => client.query('SELECT * FROM scores;'),
  insertScore: (username, score) => client.query(`INSERT INTO scores (username, score, score_date) VALUES ('${username}', ${score}, '${new Date().toISOString().slice(0, 10)}');`),
};
