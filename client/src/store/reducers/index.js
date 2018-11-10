import { combineReducers } from 'redux-immutable';

import personReducers from './person';
import personsRelationReducers from './persons-relation';
import searchPersonResultsReducers from './search-person-results';

const mainReducer = combineReducers({
  person: personReducers,
  personsRelation: personsRelationReducers,
  searchPersonResults: searchPersonResultsReducers
});

export default mainReducer;
