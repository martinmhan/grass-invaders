import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import LeaderboardModalCloseBtn from './LeaderboardModalCloseBtn';

const LeaderboardModal = ({ allScores, closeLeaderboard }) => (
  <div className="leaderboardmodal">
    <div className="leaderboardmodalcontent">
      <div className="leaderboardmodaltop">
        <LeaderboardModalCloseBtn closeLeaderboard={closeLeaderboard} />
      </div>
      <h2 className="leaderboardheader"><span>High Scores</span></h2>
      <div className="leaderboardmodallist">
        <div className="leaderboardentry">
          <div className="leaderboardscore"><strong>Score</strong></div>
          <div className="leaderboardusername"><strong>Username</strong></div>
          <div className="leaderboarddate"><strong>Date</strong></div>
        </div>
        {allScores.map((score, i) => (
          <div className="leaderboardentry">
            <div className="leaderboardscore" key={i}>{score.score}</div>
            <div className="leaderboardusername" key={i}>{score.username}</div>
            <div className="leaderboarddate" key={i}>{format(score.score_date, 'MM-DD-YYYY')}</div>
          </div>
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
