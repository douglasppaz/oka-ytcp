import React from 'react';
import getLocalAddrs from './getLocalAddrs';
import Queue from 'promise-queue';
import keys from 'lodash-es/keys';
import range from 'lodash-es/range';
import request from 'request-promise';

import { SERVER_PORT } from '../../../../constants.json';
import { name, version } from '../../../../package.json';

const searchServerQueue = new Queue(100, Infinity);

const verboseStatus = {
  [-2]: 'não verificado',
  [-1]: 'verificando',
  0: 'indisponível',
  1: 'disponível',
  2: 'versão diferente',
};


class SearchServer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: false, addrs: {} };
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

  updateAddrStatus(addr, newStatus) {
    this.setState((state) => {
      const { addrs } = state;
      addrs[addr] = newStatus;
      return { addrs };
    });
  }

  addPosibleAddrs(newAddr) {
    this.updateAddrStatus(newAddr, -2);

    searchServerQueue.add(() => new Promise((resolve) => {
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
    const { addrs } = this.state;
    const availableAddrs = keys(addrs)
      .filter((key) => addrs[key] === 1)
      .map((key) => {
        const value = addrs[key];
        return (<div key={key}>{key}: {verboseStatus[value] || value}</div>);
      });
    const unknownAddrsCount = keys(addrs)
      .filter((key) => [-1, -2].includes(addrs[key]))
      .length;
    return (
      <div>
        <p>restantes: {unknownAddrsCount}</p>
        {availableAddrs}
      </div>
    );
  }
}

export default SearchServer;
