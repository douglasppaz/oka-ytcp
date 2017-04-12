import React from 'react';

import { SERVER_PORT } from '../../../constants.json';


class WebSocketConnect extends React.Component {
  componentDidMount() {
    const { server } = this.context;
    const wsURL = `ws://${server}:${SERVER_PORT}`;
    this.ws = new WebSocket(wsURL);
    this.ws.onopen = () => { this.ws.send('opa'); };
    this.ws.onclose = console.warn;
    this.ws.onmessage = console.debug;
    this.ws.onerror = console.error;
  }

  render() {
    return (
      <div>websocket</div>
    );
  }
}

WebSocketConnect.contextTypes = { server: React.PropTypes.string };

export default WebSocketConnect;
