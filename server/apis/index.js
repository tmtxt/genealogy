'use strict';

const Router = require('koa-router');

const middlewares = require('../middlewares');

// route handlers
const person = require('./person');
const tree = require('./tree');
const user = require('./user');

const router = new Router({ prefix: '/api' });
router.use(middlewares.logTrailMiddleware);
router.use(middlewares.errorHandler);
router.use(middlewares.schemaValidation);

router.get('/root-person', person.getRootPerson);
router.get('/persons/:personId', person.getPersonById);
router.get('/detailed-persons/:personId', person.getPersonByIdWithRelations);
router.patch('/persons/:personId', person.updatePersonById);
router.post('/persons/add-child/father/:fatherPersonId/mother/:motherPersonId', person.addChild);
router.post('/persons/:personId/add-husband', person.addHusband);
router.post('/persons/:personId/add-wife', person.addWife);
router.delete('/persons/:personId', person.removePerson);

router.get('/root-person/tree', tree.getTreeFromRoot);

router.post('/login', user.login);
router.post('/logout', user.logout);

router.all('/*', async ctx => ctx.responseError(404, 'API not found'));

module.exports = router;
