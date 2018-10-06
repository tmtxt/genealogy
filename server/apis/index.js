'use strict';

const Router = require('koa-router');

const router = new Router({
  prefix: '/api'
});

router.get('/person/:personId', (ctx, next) => {
  ctx.body = {
    hello: 'abc'
  };
});

module.exports = router;
