import { createStore, combineReducers } from 'redux';
import reducers from './reducers'

export default createStore(
  combineReducers(reducers),
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
