'use strict';

const Router = require('koa-router');

const middlewares = require('../middlewares');

const router = new Router({ prefix: '/api' });
router.use(middlewares.logTrailMiddleware);

router.get('/person/:personId', (ctx, next) => {
  ctx.body = {
    hello: 'abc'
  };
});

module.exports = router;
