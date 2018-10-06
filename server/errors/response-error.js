'use strict';

class ResponseError {
  // status code + message
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

module.exports = ResponseError;
