export const selectPersonsRelation = (state, fromPersonId, toPersonId) => {
  const id = `${fromPersonId}-${toPersonId}`;
  return state.getIn(['personsRelation', id]);
};
