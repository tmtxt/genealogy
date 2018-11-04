import { handleActions } from 'redux-actions';
import { Map as ImmutableMap } from 'immutable';

export default handleActions(
  {
    test: state => state
  },
  ImmutableMap()
);
