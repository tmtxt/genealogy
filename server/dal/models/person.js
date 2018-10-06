'use strict';

const ModelBase = require('./base');

class Person extends ModelBase {
  static get schema() {
    return {
      type: 'object',
      properties: {
        isRoot: { type: 'boolean' }
      }
    };
  }
}

module.exports = Person;
