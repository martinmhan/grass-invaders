import React from 'react';
import Ship from './Ship.jsx';
import Laser from './Laser.jsx';
import Wall from './Wall.jsx';
import Enemy from './Enemy.jsx';
import Explosion from './Explosion.jsx';

const Cell = (props) => {
  const map = {
    ship: <Ship/>,
    laser: <Laser/>,
    wall: <Wall/>,
    enemy: <Enemy/>,
    explosion: <Explosion/>
  };

  const item = props.gridMatrix[props.row] ? props.gridMatrix[props.row][props.col] : null;

  return (
    <div className="cell">
      <div className="cellspace" id={`r${props.row}c${props.col}`} />
      {map[item]}
    </div>
  );
};

export default Cell;
