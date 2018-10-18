'use strict';

const ModelBase = require('./base');

class User extends ModelBase {
  static get schema() {
    return {
      type: 'object',
      properties: {
        username: {
          type: 'string'
        },
        password: {
          type: 'string'
        }
      },
      required: ['username', 'password']
    };
  }
}

module.exports = User;
