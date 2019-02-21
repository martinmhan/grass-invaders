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

Cell.propTypes = {
  cell: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
};

export default Cell;
