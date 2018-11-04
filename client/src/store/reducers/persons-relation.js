import { handleActions } from 'redux-actions';
import { Map as ImmutableMap } from 'immutable';

import actionTypes from 'store/action-types/persons-relation';

export default handleActions(
  {
    [actionTypes.setPersonsRelation]: state => state.set('a', 'b')
  },
  ImmutableMap()
);
