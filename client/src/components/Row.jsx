import React from 'react';
import Cell from './Cell.jsx';

const Row = (props) => {
  const cells = [];
  for (let i = 0; i < props.cols; i++) {
    cells.push(i);
  }

  return (
    <div className="row">
      {cells.map((cell) => (
        <Cell
          gridMatrix={props.gridMatrix}
          row={props.row}
          col={cell}
          key={cell}
        />
      ))}
    </div>
  );
};

export default Row;
