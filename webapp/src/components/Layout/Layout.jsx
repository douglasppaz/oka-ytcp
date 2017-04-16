import React, { PropTypes } from 'react';
import TopBar from './TopBar';
import classes from './Layout.scss';

class Layout extends React.Component {
  render() {
    const { topbar, children } = this.props;
    return (
      <div className={classes.layout}>
        <div className="topbar">{topbar !== undefined ? topbar : <TopBar />}</div>
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
