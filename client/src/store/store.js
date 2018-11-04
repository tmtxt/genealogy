import { createStore, applyMiddleware } from 'redux';
import { Map as ImmutableMap } from 'immutable';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import mainReducer from './reducers';

const loggerMiddleware = createLogger({
  level: 'info',
  stateTransformer: state => state.toJS()
});

const mainStore = createStore(
  mainReducer,
  ImmutableMap(),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default mainStore;
