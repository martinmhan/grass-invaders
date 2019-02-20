const router = require('express').Router();
const { getScores, addScore } = require('./controller.js');

router.route('/scores')
  .get(getScores)
  .post(addScore);

module.exports = router;
