import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import VideoCard from '../components/VideoCard';
import SearchField from '../components/SearchField';
import YTSearch from '../components/YTSearch';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  changeQuery(query) {
    this.setState({ query });
  }

  render() {
    const { videos } = this.props;
    const { query } = this.state;
    const videosCard = videos.map((video) => <VideoCard key={video.id} video={video} />);

    return (
      <Layout>
        <SearchField onChange={q => this.changeQuery(q)} />
        {videosCard}
        <YTSearch query={query} />
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
