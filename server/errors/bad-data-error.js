'use strict';

const ResponseError = require('./response-error');

class BadDataError extends ResponseError {
  // status code + message
  constructor(message) {
    super(400, message);
  }
}

module.exports = BadDataError;
