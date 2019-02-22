import React from 'react';
import PropTypes from 'prop-types';
import Ship from './Ship';
import Laser from './Laser';
import Wall from './Wall';
import Enemy from './Enemy';

const map = {
  ship: <Ship />,
  laser: <Laser />,
  wall: <Wall />,
  enemy: <Enemy />,
};

const Cell = props => (
  <div className="cell">
    <div className="cellspace" id={`r${props.row}c${props.col}`} />
    {map[props.cell]}
  </div>
);

Cell.defaultProps = {
  cell: null,
  row: null,
  col: null,
};

Cell.propTypes = {
  cell: PropTypes.string,
  row: PropTypes.number,
  col: PropTypes.number,
};

export default Cell;
