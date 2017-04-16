import React from 'react';
import Card from 'material-ui/Card/Card';
import VideoTumbnail from './VideoTumbnail';
import { secondsToStr } from '../../utils/time';
import classes from './VideoCard.scss';


class VideoCard extends React.Component {
  render() {
    const { title, thumbnails, duration } = this.props.video;
    return (
      <Card className="container">
        <div className={classes.container}>
          <div className="tumbnail">
            <VideoTumbnail thumbnails={thumbnails} />
          </div>
          <div className="info">
            <div>{title}</div>
            <div className="footer">Duração: {secondsToStr(duration)}</div>
          </div>
        </div>
      </Card>
    );
  }
}

VideoCard.propTypes = { video: React.PropTypes.object };

export default VideoCard;
