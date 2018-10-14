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

module.exports = PersonUpdate;
