// @flow
import { fromJS } from 'immutable';

import actionTypes from 'store/action-types';
import type { SetSearchPersonResultsActionType } from 'store/types/person';

import sendApiRequest from './api';

export const setSearchPersonResults = (
  searchKey: string,
  results: Object
): SetSearchPersonResultsActionType => ({
  type: actionTypes.person.findPersonByName,
  searchKey,
  results: fromJS(results)
});

export const findPersonByName = (searchKey: string) => async (dispatch: Function) => {
  dispatch(setSearchPersonResults(searchKey, { isLoading: true, isLoaded: false }));

  const res = await sendApiRequest('person.findPersonByName', null, null, { searchKey });
  const results: Array<any> = res.results;
  dispatch(setSearchPersonResults(searchKey, { isLoading: false, isLoaded: true, results }));
};
