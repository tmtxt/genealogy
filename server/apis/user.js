'use strict';

const dal = require('../dal');

const userDal = dal.user;

// POST /login
// Body:
// {
//   username: string,
//   password: string
// }
const login = async ctx => {
  const body = ctx.request.body;
  const username = body.username;
  const password = body.password;

  const valid = await userDal.comparePassword(username, password);
  if (!valid) {
    ctx.responseError(401, 'Invalid username or password');
  }

  ctx.cookies.set('username', username, { signed: true });
  ctx.cookies.set('password', password, { signed: true });

  ctx.status = 204;
};

module.exports = {
  login
};
