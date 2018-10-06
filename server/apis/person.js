'use strict';

const dal = require('../dal');

const personDal = dal.person;

// route handlers for person
const getRootPerson = async ctx => {
  const logTrail = ctx.logTrail;
  const root = await personDal.getRootPerson(logTrail);

  if (!root) {
    return (ctx.status = 404);
  }

  ctx.body = root;
};

const getPersonById = async ctx => {
  const logTrail = ctx.logTrail;
  const personId = ctx.params.personId;

  const person = await personDal.getPersonById(personId, logTrail);

  if (!person) {
    return (ctx.status = 404);
  }

  ctx.body = person;
};

module.exports = {
  getRootPerson,
  getPersonById
};
