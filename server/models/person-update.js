'use strict';

const ModelBase = require('./base');

class PersonUpdate extends ModelBase {
  static get schema() {
    return {
      type: 'object',
      properties: {
        name: {
          oneOf: [{ type: 'string' }, { type: 'null' }]
        },
        gender: {
          oneOf: [
            {
              type: 'string',
              enum: ['male', 'female']
            },
            {
              type: 'null'
            }
          ]
        },
        birthDate: {
          oneOf: [
            {
              // date string YYYY-MM-DD
              type: 'string',
              format: 'dateString'
            },
            { type: 'null' }
          ]
        },
        deathDate: {
          oneOf: [
            {
              // date string YYYY-MM-DD
              type: 'string',
              format: 'dateString'
            },
            { type: 'null' }
          ]
        },
        job: {
          oneOf: [{ type: 'string' }, { type: 'null' }]
        },
        summary: {
          oneOf: [{ type: 'string' }, { type: 'null' }]
        },
        isDead: {
          type: 'boolean'
        },
        picture: {
          oneOf: [{ type: 'string' }, { type: 'null' }]
        }
      }
    };
  }
}

module.exports = PersonUpdate;
