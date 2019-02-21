import React from 'react';

const ButtonPad = props => (
  <div className="buttonpad">
    <button type="button" className="startgamebtn" onClick={props.startGame}>Start Game</button>
    <button type="button" className="endgamebtn" onClick={props.endGame}>End Game</button>
  </div>
);

export default ButtonPad;
