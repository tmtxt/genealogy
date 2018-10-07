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
router.get('/persons/:personId', person.getPersonById);
router.patch('/persons/:personId', person.updatePersonById);
router.post('/persons/add-child/father/:fatherPersonId/mother/:motherPersonId', person.addChild);

module.exports = router;
