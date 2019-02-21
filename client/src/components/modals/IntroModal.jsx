import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IntroModal extends Component {
  static propTypes = {
    letsPlay: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      usernameInput: '',
    };
  }

  updateUsernameInput = (e) => {
    const usernameInput = e.target.value;
    this.setState({ usernameInput });
  };

  render = () => (
    <div className="intromodal">
      <div className="intromodalcontent">
        Welcome to Grass Invaders!
        <br />
        <br />
        Play by simply using your arrow keys to move and space bar to shoot.
        <br />
        <br />
        First, please enter a username:
        <br />
        <input
          type="text"
          className="usernameinput"
          onChange={this.updateUsernameInput}
          maxLength="10"
        />
        <button
          type="button"
          className="letsplaybtn"
          onClick={() => { this.props.letsPlay(this.state.usernameInput); }}
        >
          {'Let\'s Play!'}
        </button>
      </div>
    </div>
  );
}

export default IntroModal;
