import React, { PropTypes } from 'react';

import PlayerBar from './PlayerBar';


class PlayerManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: null,
      playlist: [],
    };
  }

  getChildContext() {
    return {
      playNow: (videoId) => this.setState({ now: videoId }),
    };
  }

  render() {
    const { now, playlist } = this.state;
    const { children } = this.props;

    return (
      <div style={{ paddingBottom: (now ? 56 : 0) }}>
        <div>{children}</div>
        {now && <PlayerBar now={now} playlist={playlist} />}
      </div>
    );
  }
}

PlayerManager.propTypes = {
  children: PropTypes.node,
};

PlayerManager.childContextTypes = {
  playNow: PropTypes.func,
};

export default PlayerManager;
