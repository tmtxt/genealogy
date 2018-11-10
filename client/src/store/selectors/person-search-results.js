// @flow
import { Map as ImmutableMap } from 'immutable';

export const selectPersonSearchResults = (
  state: ImmutableMap<string, any>,
  searchKey: string
): ImmutableMap<string, any> => {
  return state.getIn(['searchPersonResults', searchKey]) || ImmutableMap().set('isLoaded', false);
};
