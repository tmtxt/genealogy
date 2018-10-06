'use strict';

const ResponseError = require('../errors').ResponseError;

const schemaValidation = async (ctx, next) => {
  ctx.validateRequestBody = ModelClass => {
    try {
      ctx.request.body = new ModelClass(ctx.request.body);
      return ctx.request.body;
    } catch (e) {
      throw new ResponseError(400, e.message);
    }
  };
  await next();
};

module.exports = schemaValidation;
