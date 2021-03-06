import React, { PropTypes } from 'react';
import Card from 'material-ui/Card/Card';
import FontIcon from 'material-ui/FontIcon/FontIcon';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import VideoTumbnail from './VideoTumbnail';
import { ytDurationParse } from '../../utils/time';
import classes from './VideoCard.scss';


class VideoCard extends React.Component {
  render() {
    const { actions, video, loading } = this.props;
    const { title, thumbnails, duration, percent } = video;
    const verbose_percent = percent === 100 ?
      <span>Baixado</span> :
      <span>Baixando <span>{~~(percent)}%</span></span>;
    return (
      <div className={`container ${classes.container}`}>
        {loading && <div className="loading"><CircularProgress /></div>}
        <div data-layout="row">
          <Card style={{ width: '100%' }}>
            <div className={classes.cardContent}>
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
            {actions.map(({ fn, icon }, i) => (
              <div key={i}><FontIcon
                className="material-icons"
                color="#34495e"
                hoverColor="#3498db"
                style={{ fontSize: 32 }}
                onTouchTap={fn}
              >{icon}</FontIcon></div>
            ))}
          </div>}
        </div>
      </div>
    );
  }
}

VideoCard.propTypes = {
  video: PropTypes.object,
  actions: PropTypes.array,
  loading: PropTypes.bool
};

export default VideoCard;
