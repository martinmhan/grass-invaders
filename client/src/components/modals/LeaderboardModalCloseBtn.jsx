import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LeaderboardModalCloseBtn extends Component {
  static propTypes = {
    closeLeaderboard: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { mouseDown: false };
  }

  render = () => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      role="button"
      tabIndex={0}
      className={`leaderboardclosebtn${this.state.mouseDown ? ' leaderboardclosebtnmousedown' : ''}`}
      onMouseDown={() => { this.setState({ mouseDown: true }); }}
      onMouseUp={() => { this.setState({ mouseDown: false }); }}
      onMouseLeave={() => { this.setState({ mouseDown: false }); }}
      onClick={this.props.closeLeaderboard}
    >
      <img className="leaderboardclosebtnimg" alt="" src="https://s3-us-west-1.amazonaws.com/gitbuckets/grass-invaders/x.png" />
    </div>
  );
}

export default LeaderboardModalCloseBtn;
