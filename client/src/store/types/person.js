// @flow
import { Map as ImmutableMap } from 'immutable';

import actionTypes from 'store/action-types';

export type SetSearchPersonResultsActionType = {
  type: actionTypes.person.findPersonByName,
  searchKey: string,
  results: ImmutableMap<string, any>
};
