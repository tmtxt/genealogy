import { createStore, applyMiddleware } from 'redux';
import { Map as ImmutableMap } from 'immutable';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

import mainReducer from './reducers';

const mainStore = createStore(
  mainReducer,
  ImmutableMap(),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default mainStore;
