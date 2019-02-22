import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import IntroModal from '../modals/IntroModal';
import GameOverModal from '../modals/GameOverModal';
import LeaderboardModal from '../modals/LeaderboardModal';

const Grid = props => (
  <div role="grid" className="grid" tabIndex="0" onKeyDown={props.handleKeyDown}>
    { props.gameState === 'game over' ? <GameOverModal /> : null }
    { props.gameState === 'intro' ? <IntroModal letsPlay={props.letsPlay} /> : null }
    { props.gameState === 'leaderboard'
      ? <LeaderboardModal closeLeaderboard={props.closeLeaderboard} allScores={props.allScores} />
      : null }
    { props.gridMatrix.map((rowArr, row) => (
      <Row
        cols={props.cols}
        rowArr={rowArr}
        row={row}
        key={row}
      />
    ))}
  </div>
);

Grid.propTypes = {
  cols: PropTypes.number.isRequired,
  letsPlay: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  gridMatrix: PropTypes.arrayOf(PropTypes.array).isRequired,
  gameState: PropTypes.string.isRequired,
  allScores: PropTypes.arrayOf(PropTypes.any).isRequired,
  closeLeaderboard: PropTypes.func.isRequired,
};

export default Grid;
