export default {
  'person.getPersonById': {
    path: '/api/persons/:personId',
    method: 'GET'
  },

  'person.getPersonByIdWithRelations': {
    path: '/api/detailed-persons/:personId',
    method: 'GET'
  }
};
