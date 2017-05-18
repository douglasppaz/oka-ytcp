import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import values from 'lodash-es/values';
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

  doPlay(videoId) {
    const { playNow } = this.context;
    playNow(videoId);
  }

  render() {
    const { videos } = this.props;
    const { query } = this.state;
    const videosCard = values(videos).map((video) => (
      <VideoCard
        key={video.id}
        video={video}
        actions={[
          {
            fn: () => { this.doPlay(video.id); },
            icon: 'play_arrow'
          },
          {
            fn: () => {},
            icon: 'delete'
          }
        ]}
      />
    ));

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
  videos: PropTypes.object,
};

Home.contextTypes = {
  playNow: PropTypes.func,
};

const mapStateToProps = ({ videos }) => ({ videos });

export default connect(mapStateToProps)(Home);
