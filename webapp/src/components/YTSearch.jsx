import React, { Component, PropTypes } from 'react';
import request from 'request-promise';

import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';

import VideoCard from './VideoCard';

import { getVideoInfo } from '../core/Api';

const initialState = {
  loading: false,
  results: [],
  nextPageToken: null,
};

class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  doDownload() {
    const { video } = this.props;
    const { server } = this.context;
    this.setState({ loading: true });
    getVideoInfo(server, video.id)
      .then(() => {})
      .catch(() => {})
      .then(() => this.setState({ loading: false }));
  };

  render() {
    const { video } = this.props;
    const { loading } = this.state;
    return (
      <VideoCard
        video={video}
        actions={[
          {
            fn: () => {},
            icon: 'play_arrow'
          },
          {
            fn: () => this.doDownload(),
            icon: 'file_download'
          }
        ]}
        loading={loading}
      />
    );
  }
}

SearchItem.contextTypes = { server: PropTypes.any };

class YTSearch extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() { this.search(this.props.query); }
  componentWillReceiveProps(newProps) {
    const { query } = newProps;
    if (this.props.query !== query)
      this.search(query);
  }

  search(query) {
    this.setState(initialState);
    if (!query) return false;
    this.searchMore(query);
  }

  searchMore(query) {
    const { nextPageToken } = this.state;
    const searchURL = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YT_API_KEY}&part=snippet&q=${query}&type=video${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
    this.setState({ loading: true });
    request.get(searchURL)
      .then(JSON.parse)
      .then((data) => {
        const { items } = data;
        const results = items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnails: [{
            type: 'url',
            value: item.snippet.thumbnails.medium.url
          }],
          full: item
        }));
        this.setState(state => ({
          results: state.results.concat(results),
          loading: false,
          nextPageToken: data.nextPageToken
        }));
      });
  }

  render() {
    const { query } = this.props;

    if (!query) return null;

    const { loading, results, nextPageToken } = this.state;

    return (
      <div>
        <div className="container"><h4>Resultados encontrados em youtube.com para "{query}"</h4></div>
        {results.map(video => <SearchItem key={video.id} video={video} />)}
        {loading && <div className="container"><CircularProgress /></div>}
        {!loading && nextPageToken && <div className="container">
          <RaisedButton
            primary
            label="Carregar +"
            onTouchTap={() => this.searchMore(query)}
          />
        </div>}
      </div>
    );
  }
}

YTSearch.propTypes = { query: PropTypes.string };

export default YTSearch;
