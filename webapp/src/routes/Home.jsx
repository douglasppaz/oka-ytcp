import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import Layout from '../components/Layout';
import VideoCard from '../components/VideoCard';


class Home extends React.Component {
  render() {
    const { videos } = this.props;
    const videosCard = videos.map((video) => <VideoCard key={video.id} video={video} />);
    return (
      <Layout>
        {videosCard}
      </Layout>
    );
  }
}

Home.propTypes = {
  videos: PropTypes.array,
};

const mapStateToProps = state => ({
  videos: state.videos,
});

export default connect(mapStateToProps)(Home);
