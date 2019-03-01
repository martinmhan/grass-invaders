const { selectScores, insertScore } = require('../database/dbHelpers.js');

module.exports = {
  getScores: async (req, res) => {
    try {
      const { rows } = await selectScores();
      res.status(200).send(rows);
    } catch (err) {
      res.status(404).send(err);
    }
  },
  addScore: async (req, res) => {
    try {
      const { username, score } = req.body;
      await insertScore(username, score);
      res.status(201).send('Post request successful');
    } catch (err) {
      res.status(404).send(err);
    }
  },
};
