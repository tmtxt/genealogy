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

// GET /person/:personId
const getPersonById = async ctx => {
  const logTrail = ctx.logTrail;
  const personId = ctx.params.personId;

  const person = await personDal.getPersonById(personId, logTrail);
  if (!person) {
    ctx.responseError(404, 'Person not found');
  }

  ctx.body = person;
};

// PATH /person/:personId
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

module.exports = {
  getRootPerson,
  getPersonById,
  updatePersonById
};
