'use strict';

const _ = require('lodash');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const mount = require('koa-mount');
const fs = require('fs');

const config = require('./config');
const apiRouter = require('./apis');
const initApp = require('./init');

const template = fs.readFileSync('./static/index.html');
const serverData = config.app;
const indexTemplate = _.replace(template, '___SERVER_DATA___', JSON.stringify(serverData));

const startWebServer = () => {
  const app = new Koa();

  app.keys = [config.secretKey];

  app.use(koaStatic('./static', { index: 'index.truong' }));
  app.use(mount('/pictures/', koaStatic('./pictures')));
  app.use(bodyParser());
  app.use(apiRouter.routes()).use(apiRouter.allowedMethods());
  app.use(ctx => {
    ctx.body = indexTemplate;
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
