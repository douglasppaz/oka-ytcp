import React from'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import store from './redux/store';

import './style/main.scss';

window.dispatch = store.dispatch;
injectTapEventPlugin();

ReactDOM.render(
  (
    <Provider store={store}>
      <MuiThemeProvider>
        <h1>Hello, world!</h1>
      </MuiThemeProvider>
    </Provider>
  ),
  document.getElementById('app')
);
