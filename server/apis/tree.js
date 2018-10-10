'use strict';

const dal = require('../dal');

const personDal = dal.person;

const getTreeFromRoot = async ctx => {
  const logTrail = ctx.logTrail;
  const rootPerson = await personDal.getRootPerson(logTrail);

  ctx.body = rootPerson;
};

module.exports = {
  getTreeFromRoot
};
