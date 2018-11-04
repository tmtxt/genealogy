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
  },

  'person.getChildrenWithOrder': {
    path: '/api/persons/:personId/children-order',
    method: 'GET'
  },

  'person.updateChildrenOrder': {
    path: '/api/persons/:personId/children-order',
    method: 'POST'
  },

  'person.getRelationBetweenPerson': {
    path: '/api/relationship/from/:fromPersonId/to/:toPersonId',
    method: 'GET'
  },

  'user.login': {
    path: '/api/login',
    method: 'POST'
  },

  'user.logout': {
    path: '/api/logout',
    method: 'POST'
  },

  'user.changePassword': {
    path: '/api/change-password',
    method: 'POST'
  },

  'tree.getTreeFromRoot': {
    path: '/api/root-person/tree',
    method: 'GET'
  },

  'tree.getTreeFromPerson': {
    path: '/api/persons/:personId/tree',
    method: 'GET'
  },

  'content.getContent': {
    path: '/api/contents/:contentKey',
    method: 'GET'
  },

  'content.upsertContent': {
    path: '/api/contents/:contentKey',
    method: 'POST'
  }
};
