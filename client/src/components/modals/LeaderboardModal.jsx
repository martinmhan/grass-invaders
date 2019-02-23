import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardListHeader from './LeaderboardListHeader';
import LeaderboardEntry from './LeaderboardEntry';
import LeaderboardModalCloseBtn from './LeaderboardModalCloseBtn';

const LeaderboardModal = ({ allScores, closeLeaderboard }) => (
  <div className="leaderboardmodal">
    <div className="leaderboardmodalcontent">
      <div className="leaderboardmodaltop">
        <LeaderboardModalCloseBtn closeLeaderboard={closeLeaderboard} />
      </div>
      <h2 className="leaderboardheader"><span>High Scores</span></h2>
      <LeaderboardListHeader />
      <div className="leaderboardlist">
        {allScores.map((score, i) => (<LeaderboardEntry score={score} key={i} />))}
      </div>
    </div>
  </div>
);

LeaderboardModal.propTypes = {
  allScores: PropTypes.arrayOf(PropTypes.object).isRequired,
  closeLeaderboard: PropTypes.func.isRequired,
};

export default LeaderboardModal;
