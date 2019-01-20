import React from 'react';
import Ship from './Ship.jsx';
import Laser from './Laser.jsx';
import Wall from './Wall.jsx';
import Enemy from './Enemy.jsx';

const map = {
  ship: <Ship/>,
  laser: <Laser/>,
  wall: <Wall/>,
  enemy: <Enemy/>,
};

const Cell = (props) => (
  <div className="cell">
    <div className="cellspace" id={`r${props.row}c${props.col}`} />
    {map[props.cell]}
  </div>
);

export default Cell;
