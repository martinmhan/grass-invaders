import React from 'react';
import Cell from './Cell.jsx';

const Row = (props) => (
  <div className="row">
    {props.rowArr.map((cell, col) => (
      <Cell
        cell={cell}
        row={props.row}
        col={col}
        key={col}
      />
    ))}
  </div>
);

export default Row;
