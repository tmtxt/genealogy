'use strict';

const ModelBase = require('./base');

class PersonUpdate extends ModelBase {
  static get schema() {
    return {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        gender: {
          type: 'string',
          enum: ['male', 'female']
        }
      }
    };
  }
}

module.exports = PersonUpdate;
