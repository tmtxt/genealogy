// @flow
import { handleActions } from 'redux-actions';
import { Map as ImmutableMap } from 'immutable';

import actionTypes from 'store/action-types';
import type { SetSearchPersonResultsActionType } from 'store/types/person';

const reduceFindPersonByName = (
  state: ImmutableMap<string, any>,
  action: SetSearchPersonResultsActionType
) => {
  const { searchKey, results } = action;
  return state.set(searchKey, results);
};

// keys are the search string
export default handleActions(
  {
    [actionTypes.person.findPersonByName]: reduceFindPersonByName
  },
  ImmutableMap()
);
