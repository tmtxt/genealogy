'use strict';

const Router = require('koa-router');

const middlewares = require('../middlewares');

// route handlers
const person = require('./person');

const router = new Router({ prefix: '/api' });
router.use(middlewares.logTrailMiddleware);

router.get('/root-person', person.getRootPerson);

module.exports = router;
