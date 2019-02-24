import React from 'react';
import PropTypes from 'prop-types';

const ButtonPad = ({ startGame, openLeaderboard }) => (
  <div className="buttonpad">
    <button type="button" className="startgamebtn" onClick={startGame}>Start Game</button>
    <button type="button" className="leaderboardbtn" onClick={openLeaderboard}>High Scores</button>
  </div>
);

ButtonPad.propTypes = {
  startGame: PropTypes.func.isRequired,
  openLeaderboard: PropTypes.func.isRequired,
};

export default ButtonPad;
