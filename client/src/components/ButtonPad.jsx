import React from 'react';

const ButtonPad = (props) => (
  <div className="buttonpad">
    <button onClick={props.startGame}>Start Game</button>
    <button onClick={props.endGame}>End Game</button>
  </div>
);

export default ButtonPad;
