'use strict';

const dal = require('../dal');

const userDal = dal.user;

const ms1Week = 7 * 24 * 60 * 60 * 1000;

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

  ctx.cookies.set('username', username, { signed: true, maxAge: ms1Week, httpOnly: false });
  ctx.cookies.set('password', password, { signed: true, maxAge: ms1Week, httpOnly: false });

  ctx.status = 204;
};

const logout = async ctx => {
  ctx.cookies.set('username', 'username', { signed: true, maxAge: 0, httpOnly: false });
  ctx.cookies.set('password', 'password', { signed: true, maxAge: 0, httpOnly: false });

  ctx.status = 204;
};

module.exports = {
  login,
  logout
};
