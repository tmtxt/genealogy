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
          type: 'string',
          enum: ['male', 'female']
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
        }
      }
    };
  }
}

module.exports = PersonUpdate;
