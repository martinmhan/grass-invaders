import React from 'react';
import PropTypes from 'prop-types';

const Score = props => (
  <div className="scoreboard">
    {`Score: ${props.score}`}
  </div>
);

Score.propTypes = {
  score: PropTypes.number.isRequired,
};

export default Score;
