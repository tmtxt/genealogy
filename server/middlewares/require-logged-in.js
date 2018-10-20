'use strict';

const userDal = require('../dal').user;
const ResponseError = require('../errors').ResponseError;

const requireLoggedIn = async (ctx, next) => {
  const username = ctx.cookies.get('username');
  const password = ctx.cookies.get('password');

  const valid = await userDal.comparePassword(username, password);
  if (!valid) {
    throw new ResponseError(401, 'Not allowed');
  }

  await next();
};

module.exports = requireLoggedIn;
