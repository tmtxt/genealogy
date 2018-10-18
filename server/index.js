'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const send = require('koa-send');

const config = require('./config');
const apiRouter = require('./apis');
const initApp = require('./init');

const startWebServer = () => {
  const app = new Koa();

  app.keys = [config.secretKey];

  app.use(koaStatic('./static'));
  app.use(bodyParser());
  app.use(apiRouter.routes()).use(apiRouter.allowedMethods());
  app.use(async ctx => {
    await send(ctx, 'static/index.html');
  });

  app.listen(config.port);
  console.log(`Backend server is listening on port ${config.port}`);
};

// entry point
const start = async () => {
  await initApp();

  startWebServer();
};
start();
