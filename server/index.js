'use strict';

const Koa = require('koa');

const config = require('./config');
const apiRouter = require('./apis');

const app = new Koa();
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

app.listen(config.port);
console.log(`Backend server is listening on port ${config.port}`);
