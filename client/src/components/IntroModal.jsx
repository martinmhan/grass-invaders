import React from 'react';

const UsernameModal = (props) => (
  <div className="usernamemodal">
    <div className="usernamemodalcontent">
      Welcome to Grass Invaders!<br/><br/>
      Play by simply using your arrow keys to move and space bar to shoot.<br/><br/>
      Good luck!
      <button className="gotitbtn" onClick={props.gotIt}>Got it!</button>
    </div>
  </div>
);

export default UsernameModal;
