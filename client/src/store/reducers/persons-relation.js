import { handleActions } from 'redux-actions';
import { Map as ImmutableMap } from 'immutable';

import actionTypes from 'store/action-types';

const reduceSetPersonsRelation = (state, action) => {
  const { fromPersonId, toPersonId } = action;
  const id = `${fromPersonId}-${toPersonId}`;
  return state.set(id, action.path);
};

export default handleActions(
  {
    [actionTypes.setPersonsRelation]: reduceSetPersonsRelation
  },
  ImmutableMap()
);
