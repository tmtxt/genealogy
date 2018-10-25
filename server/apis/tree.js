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

// GET /persons/:personId/tree
const getTreeFromPerson = async ctx => {
  const logTrail = ctx.logTrail;
  const personId = ctx.params.personId;
  
  const person = await personDal.getPersonById(personId, logTrail);
  if (!person) {
    ctx.responseError(404, 'Person not found');
  }
  
  const tree = await treeDal.getTreeByPersonId(personId, logTrail);
  
  ctx.body = tree;
};

module.exports = {
  getTreeFromRoot,
  getTreeFromPerson
};
