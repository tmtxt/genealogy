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
        },
        birthDate: {
          // date string YYYY-MM-DD
          type: 'string',
          format: 'dateString'
        },
        deathDate: {
          // date string YYYY-MM-DD
          type: 'string',
          format: 'dateString'
        },
        job: {
          type: 'string'
        },
        summary: {
          type: 'string'
        },
        isDead: {
          type: 'boolean'
        }
      }
    };
  }
}

module.exports = Person;
