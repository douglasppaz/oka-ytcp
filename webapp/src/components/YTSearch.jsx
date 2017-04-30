import React from 'react';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import request from 'request-promise';

import VideoCard from './VideoCard';


class YTSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, results: [] };
  }

  componentDidMount() { this.search(this.props.query); }
  componentWillReceiveProps(newProps) {
    const { query } = newProps;
    if (this.props.query !== query)
      this.search(query);
  }

  search(query) {
    if (!query) return false;
    const searchURL = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YT_API_KEY}&part=snippet&q=${query}&type=video`;
    this.setState({ loading: true });
    request.get(searchURL)
      .then(JSON.parse)
      .then((data) => {
        console.log(data);
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
        this.setState({ results, loading: false });
      });
  }

  render() {
    const { query } = this.props;

    if (!query) return null;

    const { loading, results } = this.state;

    return (
      <div>
        <div className="container"><h4>Resultados encontrados em youtube.com para {query}</h4></div>
        {!loading && results.map((video) => <VideoCard key={video.id} video={video} />)}
        {loading && <div className="container"><CircularProgress /></div>}
      </div>
    );
  }
}

YTSearch.propTypes = { query: React.PropTypes.string };

export default YTSearch;
