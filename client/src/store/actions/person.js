// @flow
import actionTypes from 'store/action-types/persons-relation';
import sendApiRequest from './api';
import { fromJS } from 'immutable';

export const setSearchPersonResults = (searchKey: string, results: Array<any>) => ({
  type: actionTypes.person.findPersonByName,
  searchKey,
  results: fromJS(results)
});

export const findPersonByName = (searchKey: string) => async (dispatch: Function) => {
  const res = await sendApiRequest('person.findPersonByName', null, null, { searchKey });
  const results: Array<any> = res.results;

  dispatch(setSearchPersonResults(searchKey, results));
};
