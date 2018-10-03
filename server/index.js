'use strict';

const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
  ctx.status = 401;
});

app.listen(3001);
