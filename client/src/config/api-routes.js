export default {
  'person.getPersonById': {
    path: '/api/persons/:personId',
    method: 'GET'
  },

  'person.getPersonByIdWithRelations': {
    path: '/api/detailed-persons/:personId',
    method: 'GET'
  },

  'person.updatePersonById': {
    path: '/api/persons/:personId',
    method: 'PATCH'
  },

  'person.addWife': {
    path: '/api/persons/:personId/add-wife',
    method: 'POST'
  },

  'person.addHusband': {
    path: '/api/persons/:personId/add-husband',
    method: 'POST'
  },

  'person.addChild': {
    path: '/api/persons/add-child/father/:fatherPersonId/mother/:motherPersonId',
    method: 'POST'
  },

  'person.removePerson': {
    path: '/api/persons/:personId',
    method: 'DELETE'
  }
};
