import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import VideoCard from '../components/VideoCard';
import YTSearch from '../components/YTSearch';


class Home extends React.Component {
  render() {
    const { videos } = this.props;
    const videosCard = videos.map((video) => <VideoCard key={video.id} video={video} />);
    return (
      <Layout>
        <YTSearch />
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
