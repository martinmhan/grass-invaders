import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

const Row = ({ rowArr, row }) => (
  <div className="row">
    {rowArr.map((cell, col) => (
      <Cell
        cell={cell}
        row={row}
        col={col}
        key={col}
      />
    ))}
  </div>
);

Row.propTypes = {
  rowArr: PropTypes.arrayOf(PropTypes.string).isRequired,
  row: PropTypes.number.isRequired,
};

export default Row;
