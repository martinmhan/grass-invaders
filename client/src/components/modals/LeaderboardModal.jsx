import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardModalCloseBtn from './LeaderboardModalCloseBtn';

const LeaderboardModal = ({ allScores, closeLeaderboard }) => (
  <div className="leaderboardmodal">
    <div className="leaderboardmodalcontent">
      <div className="leaderboardmodaltop">
        <LeaderboardModalCloseBtn closeLeaderboard={closeLeaderboard} />
      </div>
      <h2 className="leaderboardheader"><span>High Scores</span></h2>
      <div className="leaderboardmodallist">
        {allScores.map((score, i) => (
          <div className="leaderboardscore" key={i}>{score.score}</div>
        ))}
      </div>
    </div>
  </div>
);

LeaderboardModal.propTypes = {
  allScores: PropTypes.arrayOf(PropTypes.object).isRequired,
  closeLeaderboard: PropTypes.func.isRequired,
};

export default LeaderboardModal;
