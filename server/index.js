'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');

const config = require('./config');
const apiRouter = require('./apis');

const app = new Koa();
app.use(koaStatic('./static'));
app.use(bodyParser());
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

app.listen(config.port);
console.log(`Backend server is listening on port ${config.port}`);
