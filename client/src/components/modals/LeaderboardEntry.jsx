import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const LeaderboardEntry = ({ score }) => (
  <div className="leaderboardentry">
    <div className="leaderboardscore">{score.score}</div>
    <div className="leaderboardusername">{score.username}</div>
    <div className="leaderboarddate">{format(score.score_date, 'M-D-YYYY')}</div>
  </div>
);

LeaderboardEntry.propTypes = {
  score: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LeaderboardEntry;
