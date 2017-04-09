import React from'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import store from './redux/store';


window.dispatch = store.dispatch;

ReactDOM.render(
  <Provider store={store}>
    <h1>Hello, world!</h1>
  </Provider>,
  document.getElementById('app')
);
