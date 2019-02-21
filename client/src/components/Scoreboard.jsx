import React from 'react';
import PropTypes from 'prop-types';

const Scoreboard = props => (
  <div className="scoreboard">
    {`Score: ${props.score}`}
  </div>
);

Scoreboard.propTypes = {
  score: PropTypes.number.isRequired,
};

export default Scoreboard;
