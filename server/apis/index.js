'use strict';

const Router = require('koa-router');
const busboy = require('koa-busboy');

const middlewares = require('../middlewares');

// route handlers
const person = require('./person');
const tree = require('./tree');
const user = require('./user');

const uploader = busboy();

const router = new Router({ prefix: '/api' });
router.use(middlewares.logTrailMiddleware);
router.use(middlewares.errorHandler);
router.use(middlewares.schemaValidation);

router.get('/root-person', person.getRootPerson);
router.get('/persons/:personId', person.getPersonById);
router.get('/detailed-persons/:personId', person.getPersonByIdWithRelations);
router.patch('/persons/:personId', middlewares.requireLoggedIn, person.updatePersonById);
router.post(
  '/persons/add-child/father/:fatherPersonId/mother/:motherPersonId',
  middlewares.requireLoggedIn,
  person.addChild
);
router.post('/persons/:personId/add-husband', middlewares.requireLoggedIn, person.addHusband);
router.post('/persons/:personId/add-wife', middlewares.requireLoggedIn, person.addWife);
router.delete('/persons/:personId', middlewares.requireLoggedIn, person.removePerson);
router.post(
  '/persons/:personId/picture',
  middlewares.requireLoggedIn,
  uploader,
  person.uploadPicture
);

router.get('/root-person/tree', tree.getTreeFromRoot);

router.post('/login', user.login);
router.post('/logout', middlewares.requireLoggedIn, user.logout);
router.post('/change-password', middlewares.requireLoggedIn, user.changePassword);

router.all('/*', async ctx => ctx.responseError(404, 'API not found'));

module.exports = router;
