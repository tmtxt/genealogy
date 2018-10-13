'use strict';

const _ = require('lodash');
const validate = require('jsonschema').validate;

const pickPropertiesFromSchema = (props, schema) => {
  if (schema.type !== 'object' || !schema.properties) return props;

  const keys = Object.keys(schema.properties);
  return _.pick(props, keys);
};

class ModelBase {
  constructor(props) {
    const Class = this.constructor;
    props = pickPropertiesFromSchema(props, Class.schema);
    const res = validate(props, Class.schema);

    if (!_.isEmpty(res.errors)) {
      throw res.errors[0];
    }

    return res.instance;
  }
}

module.exports = ModelBase;
