'use strict';
// ensure some data for the app to run

const AppLogTrail = require('../logger').AppLogTrail;

const config = require('../config');
const dal = require('../dal');

const ensureDataEnabled = config.ensureDataEnabled;
const personDal = dal.person;

// ensure person data
const ensurePersonData = async (logTrail) => {
  // count number of person first
  const personCount = await personDal.countPerson(logTrail);

  // no need to insert
  if (personCount) return;

  const root = { name: 'Root' };
  await personDal.insertRootPerson(root, logTrail);
};

// create data if necessary
const ensureData = async () => {
  if (!ensureDataEnabled) return;

  const logTrail = new AppLogTrail();
  await ensurePersonData(logTrail);
  logTrail.flush();
};

module.exports = ensureData;
