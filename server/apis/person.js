'use strict';

const dal = require('../dal');
const models = require('../models');

const personDal = dal.person;

// route handlers for person

// GET /root-person
const getRootPerson = async ctx => {
  const logTrail = ctx.logTrail;

  const root = await personDal.getRootPerson(logTrail);
  if (!root) {
    ctx.responseError(404, 'Root person not found');
  }

  ctx.body = root;
};

// GET /persons/:personId
const getPersonById = async ctx => {
  const logTrail = ctx.logTrail;
  const personId = ctx.params.personId;

  const person = await personDal.getPersonById(personId, logTrail);
  if (!person) {
    ctx.responseError(404, 'Person not found');
  }

  ctx.body = person;
};

// PATH /persons/:personId
const updatePersonById = async ctx => {
  const logTrail = ctx.logTrail;
  const personId = ctx.params.personId;
  const updatingProps = ctx.validateRequestBody(models.PersonUpdate);

  const updatedPerson = await personDal.updatePersonById(personId, updatingProps, logTrail);
  if (!updatedPerson) {
    ctx.responseError(404, 'Person not found');
  }

  ctx.body = updatedPerson;
};

// POST /persons/add-child/father/:fatherPersonId/mother/:motherPersonId
// Request body
// {
//   order: <int> child order
// }
// Response: <Person> the new child person object
const addChild = async ctx => {
  const logTrail = ctx.logTrail;
  const { fatherPersonId, motherPersonId } = ctx.params;
  const { order: childOrder } = ctx.request.body;

  ctx.body = await personDal.addChild(fatherPersonId, motherPersonId, childOrder, {}, logTrail);
};

// POST /persons/:personId/add-husband
// Request body
// {
//   husbandOrder: <int>,
//   wifeOrder: <int>
// }
const addHusband = async ctx => {
  const logTrail = ctx.logTrail;
  const { personId: wifeId } = ctx.params;
  const { husbandOrder, wifeOrder } = ctx.request.body;

  ctx.body = await personDal.addHusband(wifeId, husbandOrder, wifeOrder, {}, logTrail);
};

// POST /persons/:personId/add-wife
// Request body
// {
//   husbandOrder: <int>,
//   wifeOrder: <int>
// }
const addWife = async ctx => {
  const logTrail = ctx.logTrail;
  const { personId: husbandId } = ctx.params;
  const { husbandOrder, wifeOrder } = ctx.request.body;

  ctx.body = await personDal.addWife(husbandId, husbandOrder, wifeOrder, {}, logTrail);
};

module.exports = {
  getRootPerson,
  getPersonById,
  updatePersonById,
  addChild,
  addHusband,
  addWife
};
