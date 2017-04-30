import React from 'react';
import Card from 'material-ui/Card/Card';
import VideoTumbnail from './VideoTumbnail';
import { ytDurationParse } from '../../utils/time';
import classes from './VideoCard.scss';


class VideoCard extends React.Component {
  render() {
    const { title, thumbnails, duration, percent } = this.props.video;
    const verbose_percent = percent === 100 ?
      <span>Baixado</span> :
      <span>Baixando <span>{~~(percent)}%</span></span>;
    return (
      <Card className="container">
        <div className={classes.container}>
          <div className="tumbnail">
            <VideoTumbnail thumbnails={thumbnails} />
          </div>
          <div className="info">
            <div>{title}</div>
            <div className="footer">
              {duration && <span>Duração: {ytDurationParse(duration)} / </span>}
              {percent && <span>{verbose_percent}</span>}
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

VideoCard.propTypes = { video: React.PropTypes.object };

export default VideoCard;
