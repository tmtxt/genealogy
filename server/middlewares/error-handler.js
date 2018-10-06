'use strict';

const ResponseError = require('../errors').ResponseError;

const errorHandler = async (ctx, next) => {
  ctx.responseError = (status, message) => {
    throw new ResponseError(status, message);
  };

  try {
    await next();
  } catch (e) {
    if (e instanceof ResponseError) {
      ctx.status = e.status;
      ctx.body = e.message;
      return;
    }

    throw e;
  }
};

module.exports = errorHandler;
