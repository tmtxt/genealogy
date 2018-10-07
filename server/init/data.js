'use strict';
// ensure some data for the app to run

const AppLogTrail = require('../logger').AppLogTrail;

const config = require('../config');
const dal = require('../dal');

const ensureDataEnabled = config.ensureDataEnabled;
const personDal = dal.person;

// ensure person data
const ensurePersonData = async logTrail => {
  // count number of person first
  const personCount = await personDal.countPerson(logTrail);

  // no need to insert
  if (personCount) return;

  // insert root person
  const rootPerson = await personDal.insertRootPerson({ name: 'Root', gender: 'male' }, logTrail);
  const rootWifePerson = await personDal.addWife(
    rootPerson.id,
    1,
    1,
    { name: 'Root Wife', gender: 'female' },
    logTrail
  );

  // f1, 1st child, male with 1 wife
  const f1MalePerson = await personDal.addChild(
    rootPerson.id,
    rootWifePerson.id,
    1,
    { name: 'F1 Male', gender: 'male' },
    logTrail
  );
  await personDal.addWife(f1MalePerson.id, 1, 1, { name: "F1 Male's wife" }, logTrail);

  // f1, 2nd child, female, no husband
  await personDal.addChild(
    rootPerson.id,
    rootWifePerson.id,
    2,
    { name: 'F1 Female', gender: 'female' },
    logTrail
  );
};

// create data if necessary
const ensureData = async () => {
  if (!ensureDataEnabled) return;

  const logTrail = new AppLogTrail();
  await ensurePersonData(logTrail);
  logTrail.flush();
};

module.exports = ensureData;
