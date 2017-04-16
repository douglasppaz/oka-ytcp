import React from 'react';
import AppBar from 'material-ui/AppBar/AppBar';
import Drawer from 'material-ui/Drawer/Drawer';
import MenuItem from 'material-ui/MenuItem/MenuItem';
import Divider from 'material-ui/Divider/Divider';
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
    const { drawerOpen } = this.state;
    const { selectServer } = this.context;

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
        >
          <Divider />
          <MenuItem onTouchTap={selectServer}>Alterar Servidor</MenuItem>
        </Drawer>
      </div>
    );
  }
}

TopBar.contextTypes = { selectServer: React.PropTypes.func };

export default TopBar;
