import React, { PropTypes } from 'react';
import getLocalAddrs from './getLocalAddrs';
import Queue from 'promise-queue';
import keys from 'lodash-es/keys';
import range from 'lodash-es/range';
import request from 'request-promise';

import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import LinearProgress from 'material-ui/LinearProgress/LinearProgress';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Subheader from 'material-ui/Subheader/Subheader';
import CloudDone from 'material-ui/svg-icons/file/cloud-done';

import { SERVER_PORT } from '../../../../constants.json';
import { name, version } from '../../../../package.json';

const selectServerQueue = new Queue(125, Infinity);


class SelectServer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      addrs: {},
      server: null,
    };
  }

  componentDidMount() {
    getLocalAddrs((newAddr) => {
      this.addPosibleAddrs(newAddr);
      const newAddrSplit = newAddr.split('.');
      newAddrSplit.pop();
      range(1, 256)
        .forEach((i) => this.addPosibleAddrs(newAddrSplit.concat(i).join('.')));
    });
  }

  getChildContext() {
    return { server: this.state.server };
  }

  updateAddrStatus(addr, newStatus) {
    this.setState((state) => {
      const { addrs } = state;
      addrs[addr] = newStatus;
      return { addrs };
    });
  }

  addPosibleAddrs(newAddr) {
    this.updateAddrStatus(newAddr, -2);

    selectServerQueue.add(() => new Promise((resolve) => {
      this.updateAddrStatus(newAddr, -1);
      request.get(`http://${newAddr}:${SERVER_PORT}`, { timeout: 1000 })
        .then((response) => {
          const data = JSON.parse(response);
          this.updateAddrStatus(
            newAddr,
            data.name === name && data.version === version ? 1 : 2,
          );
        })
        .catch((e) => this.updateAddrStatus(newAddr, 0))
        .finally(resolve);
    }));
  }

  render() {
    const { server } = this.state;
    if (server) return this.props.children;
    
    const { addrs } = this.state;
    const addrsKeys = keys(addrs);
    const availableAddrs = addrsKeys
      .filter(key => addrs[key] === 1);
    const verifiedAddrsCount = addrsKeys
      .filter((key) => [0, 1, 2].includes(addrs[key]))
      .length;
    const addrsKeysCount = addrsKeys.length;
    const percentage = (verifiedAddrsCount / addrsKeysCount) * 100;
    const availableAddrsItems = availableAddrs.map(ip => (
      <ListItem
        key={ip}
        leftIcon={<CloudDone />}
        onTouchTap={() => this.setState({ server: ip })}
      >{ip}</ListItem>
    ));
    return (
      <Card className="container absoluteInCenter">
        <Subheader>Selecione um servidor</Subheader>
        {availableAddrsItems.length > 0 && <List>{availableAddrsItems}</List>}
        {availableAddrsItems.length === 0 && <CardText>Nenhum servidor encontrado</CardText>}
        <CardText>
          <p className="textRight small">{addrsKeysCount} IPs listados e {verifiedAddrsCount} verificados</p>
        </CardText>
        <LinearProgress mode="determinate" value={percentage} />
      </Card>
    );
  }
}

SelectServer.childContextTypes = { server: PropTypes.string };

export default SelectServer;
