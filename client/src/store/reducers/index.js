import { combineReducers } from 'redux-immutable';

import personReducers from './person';
import personsRelationReducers from './persons-relation';

const mainReducer = combineReducers({
  person: personReducers,
  personsRelation: personsRelationReducers
});

export default mainReducer;
