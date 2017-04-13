import React from 'react';

import CircularProgress from 'material-ui/CircularProgress/CircularProgress';

class SimpleLoading extends React.Component {
  render() {
    return (
      <div className="absoluteInCenter"><CircularProgress /></div>
    );
  }
}

export default SimpleLoading;
