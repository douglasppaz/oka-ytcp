import React from 'react';
import AppBar from 'material-ui/AppBar/AppBar';
import Drawer from 'material-ui/Drawer/Drawer';
import { TITLE } from '../../../../constants.json';


class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { drawerOpen: false };
  }

  toggleDrawer() {
    this.setState((state) => ({ drawerOpen: !state.drawerOpen }));
  }

  render() {
    const {drawerOpen} = this.state;

    return (
      <div>
        <AppBar
          title={TITLE}
          onLeftIconButtonTouchTap={() => this.toggleDrawer()}
        />
        <Drawer
          open={drawerOpen}
          docked={false}
          onRequestChange={() => this.toggleDrawer()}
        ></Drawer>
      </div>
    );
  }
}

export default TopBar;
