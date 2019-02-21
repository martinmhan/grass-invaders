import React from 'react';
import PropTypes from 'prop-types';

const LeaderboardModal = ({ allScores }) => (
  <div className="leaderboardmodal">
    <div className="leaderboardmodalcontent">
      {allScores.map(score => (
        <div>Score</div>
      ))}
    </div>
  </div>
);

LeaderboardModal.propTypes = {
  allScores: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LeaderboardModal;
