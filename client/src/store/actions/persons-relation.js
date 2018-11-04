import { fromJS } from 'immutable';

import actionTypes from 'store/action-types/persons-relation';

import sendApiRequest from './api';

export const setPersonsRelation = (fromPersonId, toPersonId, path) => ({
  type: actionTypes.setPersonsRelation,
  fromPersonId,
  toPersonId,
  path
});

export const fetchPersonsRelation = (fromPersonId, toPersonId) => async dispatch => {
  const res = await sendApiRequest('person.getRelationBetweenPerson', { fromPersonId, toPersonId });

  dispatch(setPersonsRelation(fromPersonId, toPersonId, fromJS(res)));
};
