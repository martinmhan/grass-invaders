import React from 'react';
import PropTypes from 'prop-types';

const ButtonPad = ({ startGame, endGame, showLeaderboard }) => (
  <div className="buttonpad">
    <button type="button" className="startgamebtn" onClick={startGame}>Start Game</button>
    <button type="button" className="endgamebtn" onClick={endGame}>End Game</button>
    <button type="button" className="leaderboardbtn" onClick={showLeaderboard}>High Scores</button>
  </div>
);

ButtonPad.propTypes = {
  startGame: PropTypes.func.isRequired,
  endGame: PropTypes.func.isRequired,
  showLeaderboard: PropTypes.func.isRequired,
};

export default ButtonPad;
