'use strict';

const ModelBase = require('./base');

class Person extends ModelBase {
  static get schema() {
    return {
      type: 'object',
      properties: {
        isRoot: {
          type: 'boolean'
        },
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

module.exports = Person;
