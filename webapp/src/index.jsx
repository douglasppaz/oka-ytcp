import React from'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SelectServer from './components/SelectServer';

import Home from './routes/Home';
import NoMatch from './routes/NoMatch';

import store from './redux/store';

import './style/main.scss';

window.dispatch = store.dispatch;
injectTapEventPlugin();

ReactDOM.render(
  (
    <Provider store={store}>
      <MuiThemeProvider>
        <SelectServer>
          <Router>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route component={NoMatch}/>
            </Switch>
          </Router>
        </SelectServer>
      </MuiThemeProvider>
    </Provider>
  ),
  document.getElementById('app')
);
