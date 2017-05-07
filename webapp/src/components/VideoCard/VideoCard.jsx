import React, { PropTypes } from 'react';
import Card from 'material-ui/Card/Card';
import FontIcon from 'material-ui/FontIcon/FontIcon';
import VideoTumbnail from './VideoTumbnail';
import { ytDurationParse } from '../../utils/time';
import classes from './VideoCard.scss';


class VideoCard extends React.Component {
  render() {
    const { title, thumbnails, duration, percent, actions } = this.props.video;
    const verbose_percent = percent === 100 ?
      <span>Baixado</span> :
      <span>Baixando <span>{~~(percent)}%</span></span>;
    return (
      <div className="container" data-layout="row">
        <Card style={{ width: '100%' }}>
          <div className={classes.container}>
            <div className="tumbnail">
              <VideoTumbnail thumbnails={thumbnails} />
            </div>
            <div className="infos">
              <div>{title}</div>
              <div className="footer">
                {duration && <span className="info">Duração: {ytDurationParse(duration)}s</span>}
                {percent && <span className="info">{verbose_percent}</span>}
              </div>
            </div>
          </div>
        </Card>
        {actions && <div className={classes.actions} data-layout="column">
          {actions.map(action => (
            <div><FontIcon
              className="material-icons"
              fontSize={36}
              color="#34495e"
              hoverColor="#3498db"
              onTouchTap={action.fn}
            >{action.icon}</FontIcon></div>
          ))}
        </div>}
      </div>
    );
  }
}

VideoCard.propTypes = {
  video: PropTypes.object,
  actions: PropTypes.array
};

export default VideoCard;
