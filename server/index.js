'use strict';

const Koa = require('koa');

const config = require('./config');

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
  ctx.status = 401;
});

app.listen(config.port);
console.log(`Backend server is listening on port ${config.port}`);
