'use strict';

const _ = require('lodash');
const moment = require('moment-timezone');
const Validator = require('jsonschema').Validator;

const validator = new Validator();
validator.customFormats.dateString = function(dateValue) {
  const m = moment(dateValue, 'YYYY-MM-DD');
  return m.isValid();
};

const pickPropertiesFromSchema = (props, schema) => {
  if (schema.type !== 'object' || !schema.properties) return props;

  const keys = Object.keys(schema.properties);
  return _.pick(props, keys);
};

class ModelBase {
  constructor(props) {
    const Class = this.constructor;
    props = pickPropertiesFromSchema(props, Class.schema);
    const res = validator.validate(props, Class.schema);

    if (!_.isEmpty(res.errors)) {
      throw res.errors[0];
    }

    return res.instance;
  }
}

module.exports = ModelBase;
