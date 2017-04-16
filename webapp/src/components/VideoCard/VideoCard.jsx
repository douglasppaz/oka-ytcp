import React from 'react';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import VideoTumbnail from './VideoTumbnail';


class VideoCard extends React.Component {
  render() {
    const { title, thumbnails } = this.props.video;
    return (
      <Card className="container">
        <div data-row>
          <div data-col-0>
            <VideoTumbnail thumbnails={thumbnails} />
          </div>
          <div data-col-1>
            <CardText>{title}</CardText>
          </div>
        </div>
      </Card>
    );
  }
}

VideoCard.propTypes = { video: React.PropTypes.object };

export default VideoCard;
