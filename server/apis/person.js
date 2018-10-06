'use strict';

const dal = require('../dal');

const personDal = dal.person;

// route handlers for person
const getRootPerson = async (ctx) => {
  const logTrail = ctx.logTrail;
  const root = await personDal.getRootPerson(logTrail);

  if (!root) {
    return ctx.status = 404;
  }

  ctx.body = root;
};

module.exports = {
  getRootPerson
};
