import React from'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import SelectServer from './components/SelectServer';
import WebSocketConnect from './components/WebSocketConnect';
import PlayerManager from './components/PlayerManager';

import injectTapEventPlugin from 'react-tap-event-plugin';

import 'react-material-layout/dist/react-material-layout.min.css';

import Home from './routes/Home';
import NoMatch from './routes/NoMatch';

import store from './redux/store';

import './utils/prototypes';
import './style/main.scss';

window.Logger = console;
window.dispatch = store.dispatch;

Logger.log('running in', process.env.NODE_ENV);
injectTapEventPlugin();

ReactDOM.render(
  (
    <Provider store={store}>
      <MuiThemeProvider>
        <SelectServer>
          <WebSocketConnect>
            <PlayerManager>
              <Router>
                <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route component={NoMatch}/>
                </Switch>
              </Router>
            </PlayerManager>
          </WebSocketConnect>
        </SelectServer>
      </MuiThemeProvider>
    </Provider>
  ),
  document.getElementById('app')
);
