import React from 'react';
import classes from './VideoTumbnail.scss';


class VideoTumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imgSrc: null };
  }

  componentDidMount() {
    const { thumbnails } = this.props;
    const thumbnail = thumbnails[0];
    if (thumbnail && thumbnail.type === 'url') {
      this.setState({ imgSrc: thumbnail.value });
    }
  }

  render() {
    const { imgSrc } = this.state;
    return (
      <div
        className={classes.imgContainer}
        style={{ backgroundImage: `url(${imgSrc})` }}
      >{imgSrc && <img src={imgSrc} />}</div>
    );
  }
}

VideoTumbnail.propTypes = {
  thumbnails: React.PropTypes.array.isRequired,
};

export default VideoTumbnail;
