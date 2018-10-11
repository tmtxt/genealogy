'use strict';

const dal = require('../dal');

const personDal = dal.person;
const treeDal = dal.tree;

// GET /root-person/tree
const getTreeFromRoot = async ctx => {
  const logTrail = ctx.logTrail;

  const rootPerson = await personDal.getRootPerson(logTrail);
  if (!rootPerson) {
    ctx.responseError(404, 'Root person not found');
  }

  const tree = await treeDal.getTreeByPersonId(rootPerson.id, logTrail);

  ctx.body = tree;
};

module.exports = {
  getTreeFromRoot
};
