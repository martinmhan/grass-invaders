import React from 'react';
import Row from './Row.jsx';
import IntroModal from './IntroModal.jsx';
import GameOverModal from './GameOverModal.jsx';

const Grid = (props) => (
  <div className="grid" tabIndex="0" onKeyDown={props.handleKeyDown}>
    {
      props.gameState === 'game over' ? <GameOverModal /> : 
      props.gameState === 'intro' ? <IntroModal gotIt={props.gotIt} /> :
      null
    }
    {props.gridMatrix.map((rowArr, row) => (
      <Row
        cols={props.cols}
        rowArr={rowArr}
        row={row}
        key={row}
      />
    ))}
  </div>
);

export default Grid;
