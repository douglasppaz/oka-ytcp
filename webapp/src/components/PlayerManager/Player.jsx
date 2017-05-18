import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import get from 'lodash-es/get';

import Card from 'material-ui/Card/Card';
import CardMedia from 'material-ui/Card/CardMedia';
import CardActions from 'material-ui/Card/CardActions';
import FlatButton from 'material-ui/FlatButton/FlatButton';

import { apiRequestUrl } from '../../core/Api';

class Player extends Component {
  render() {
    const { video, hide, hideFn } = this.props;
    const { server } = this.context;
    const filename = get(video, 'filename');
    const videoUrl = filename && apiRequestUrl(server, `/static/${filename}`);
    Logger.log('Play now', videoUrl);

    return (
      <Card style={{
        display: hide ? 'none' : 'block',
        position: 'fixed',
        bottom: 42,
        right: 16,
        zIndex: 11,
        width: 300,
        maxWidth: 'calc(100% - 32px)',
      }}>
        <CardMedia>
          <video key={video.id} style={{ width: '100%' }} controls autoPlay>
            <source src={videoUrl} />
          </video>
        </CardMedia>
        <CardActions data-layout="row" data-layout-align="end center">
          <FlatButton primary label="esconder" onTouchTap={hideFn} />
        </CardActions>
      </Card>
    );
  }
}

Player.propTypes = {
  video: PropTypes.object,
  hide: PropTypes.bool,
  hideFn: PropTypes.func,
};

Player.contextTypes = {
  server: PropTypes.string,
};

const mapStateToProps = ({ videos }) => ({ videos });

export default connect(mapStateToProps)(Player);
