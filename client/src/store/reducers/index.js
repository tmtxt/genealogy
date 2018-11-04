import { combineReducers } from 'redux-immutable';

import personReducers from './person';

const mainReducer = combineReducers({
  person: personReducers
});

export default mainReducer;
