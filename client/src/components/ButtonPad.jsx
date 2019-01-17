import React from 'react';

const ButtonPad = (props) => (
  <div className="buttonpad">
    <button className="startgamebtn" onClick={props.startGame}>Start Game</button>
    <button className="endgamebtn" onClick={props.endGame}>End Game</button>
  </div>
);

export default ButtonPad;
