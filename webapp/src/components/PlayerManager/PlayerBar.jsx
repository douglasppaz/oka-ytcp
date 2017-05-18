import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import FontIcon from 'material-ui/FontIcon/FontIcon';

import Player from './Player';

class PlayerBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hide: false };
  }

  hideFn() {
    this.setState({ hide: true });
  }

  showFn() {
    this.setState({ hide: false });
  }

  render() {
    const { videos, now } = this.props;
    const { hide } = this.state;
    const video = videos[now];

    return (
      <div>
        <Toolbar style={{ position: 'fixed', bottom: 0, left: 0, zIndex: 10, width: '100%' }}>
          <ToolbarGroup>
            <ToolbarTitle text={video.title} />
          </ToolbarGroup>
          {hide && <ToolbarGroup>
            <FontIcon
              className="material-icons"
              onTouchTap={() => this.showFn()}
            >featured_video</FontIcon>
          </ToolbarGroup>}
        </Toolbar>
        <Player video={video} hide={hide} hideFn={() => this.hideFn()} />
      </div>
    );
  }
}

PlayerBar.propTypes = {
  now: PropTypes.string,
  playlist: PropTypes.array,
};

const mapStateToProps = ({ videos }) => ({ videos });

export default connect(mapStateToProps)(PlayerBar);
