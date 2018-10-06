'use strict';

const _ = require('lodash');
const validate = require('jsonschema').validate;

class ModelBase {
  constructor(props) {
    const Class = this.constructor;
    const res = validate(props, Class.schema);

    if (!_.isEmpty(res.errors)) {
      throw res.errors[0];
    }

    return res.instance;
  }
}

module.exports = ModelBase;
