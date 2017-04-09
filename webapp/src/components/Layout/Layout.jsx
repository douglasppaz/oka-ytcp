import React, { PropTypes } from 'react';
import TopBar from './TopBar';


class Layout extends React.Component {
  render() {
    const { topbar, children } = this.props;
    return (
      <div>
        {topbar !== undefined ? topbar : <TopBar />}
        {children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  topbar: PropTypes.node,
};

export default Layout;
