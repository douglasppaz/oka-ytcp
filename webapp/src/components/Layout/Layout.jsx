import React from 'react';
import TopBar from './TopBar';


class Layout extends React.Component {
  render() {
    return (
      <div>
        <TopBar />
        <div>{this.props.children}</div>
      </div>
    );
  }
}

Layout.propTypes = { children: React.PropTypes.node.isRequired };

export default Layout;
