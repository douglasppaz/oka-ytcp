import React from 'react';

import SimpleLoading from './SimpleLoading';

import { SERVER_PORT } from '../../../constants.json';


class WebSocketConnect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentDidMount() {
    this.connect();
  }

  connect() {
    const { server } = this.context;
    const wsURL = `ws://${server}:${SERVER_PORT}`;
    this.ws = new WebSocket(wsURL);
    this.ws.onopen = () => { this.setState({ open: true }); };
    this.ws.onclose = () => {
      this.setState({ open: false });
      setTimeout(() => this.connect(), 5000);
    };
    this.ws.onmessage = ({ data }) => {
      if (!data) return false;
      const action = JSON.parse(data);
      dispatch(action);
    };
    this.ws.onerror = console.error;
  }

  render() {
    const { open } = this.state;
    if (open) return this.props.children;
    return (<SimpleLoading />);
  }
}

WebSocketConnect.contextTypes = { server: React.PropTypes.string };
WebSocketConnect.PropTypes = { children: React.PropTypes.node.isRequired };

export default WebSocketConnect;
