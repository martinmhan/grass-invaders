const { selectScores, insertScore } = require('../database/dbHelpers.js');

module.exports = {
  getScores: (req, res) => {
    selectScores()
      .then((data) => { res.status(200).send(data); })
      .catch((err) => { res.status(404).send(err); });
  },
  addScore: (req, res) => {
    const { username, newScore } = req.body;

    insertScore(username, newScore)
      .then(() => { res.status(201).send('Post request successful'); })
      .catch((err) => { res.status(404).send(err); });
  },
};
