const pool = require('./index.js');

module.exports = {
  selectScores: () => pool.query('SELECT * FROM scores;'),
  insertScore: (username, score) => pool.query(`INSERT INTO scores (username, score, score_date) VALUES ('${username}', ${score}, '${new Date().toISOString().slice(0, 10)}');`),
};
