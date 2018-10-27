'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

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

// GET /detailed-persons/:personId
const getPersonByIdWithRelations = async ctx => {
  const logTrail = ctx.logTrail;
  const personId = ctx.params.personId;

  const person = await personDal.getPersonByIdWithRelations(personId, logTrail);
  if (!person) {
    ctx.responseError(404, 'Person not found');
  }

  ctx.body = person;
};

// PATCH /persons/:personId
const updatePersonById = async ctx => {
  const logTrail = ctx.logTrail;
  const personId = ctx.params.personId;
  const updatingProps = ctx.validateRequestBody(models.PersonUpdate);

  // not allow to update picture here
  delete updatingProps.picture;

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

// DELETE /persons/:personId
const removePerson = async ctx => {
  const logTrail = ctx.logTrail;
  const { personId } = ctx.params;

  await personDal.removePerson(personId, logTrail);
  ctx.status = 204;
};

const uploadPicture = async ctx => {
  const logTrail = ctx.logTrail;
  const personId = ctx.params.personId;
  const file = ctx.request.files[0];
  if (!file) {
    this.responseError(400, 'File is required');
  }

  // save file
  const fileExt = path.extname(file.filename) || '.jpg';
  const filename = `${Date.now()}${fileExt}`;
  const saveFile = new Promise((resolve, reject) => {
    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(path.join(process.cwd(), 'pictures', filename));
    reader
      .pipe(stream)
      .on('finish', resolve)
      .on('error', reject);
  });
  await saveFile;

  const person = await personDal.updatePersonById(personId, { picture: filename }, logTrail);
  if (!person) {
    ctx.responseError(404, 'Person not found');
  }

  ctx.body = person;
  ctx.status = 200;
};

// Get list of children with name and order
const getChildrenWithOrder = async ctx => {
  const logTrail = ctx.logTrail;
  const personId = ctx.params.personId;

  const children = await personDal.getChildrenWithOrder(personId, logTrail);

  ctx.body = { children };
};

module.exports = {
  getRootPerson,
  getPersonById,
  getPersonByIdWithRelations,
  updatePersonById,
  addChild,
  addHusband,
  addWife,
  removePerson,
  uploadPicture,
  getChildrenWithOrder
};
