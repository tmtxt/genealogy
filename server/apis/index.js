'use strict';

const Router = require('koa-router');

const router = new Router({
  prefix: '/api'
});

router.get('/person/:personId', (ctx, next) => {
  ctx.body = ctx.params.personId;
});

module.exports = router;
