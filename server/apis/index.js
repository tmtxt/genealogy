'use strict';

const Router = require('koa-router');

const middlewares = require('../middlewares');

// route handlers
const person = require('./person');

const router = new Router({ prefix: '/api' });
router.use(middlewares.logTrailMiddleware);
router.use(middlewares.errorHandler);
router.use(middlewares.schemaValidation);

router.get('/root-person', person.getRootPerson);
router.get('/person/:personId', person.getPersonById);
router.patch('/person/:personId', person.updatePersonById);

module.exports = router;
