'use strict';
// ensure some data for the app to run

const AppLogTrail = require('../logger').AppLogTrail;

const config = require('../config');
const dal = require('../dal');

const ensureDataEnabled = config.ensureDataEnabled;
const personDal = dal.person;

const ensurePersonData = async (logTrail) => {
  // count number of person first
  const personCount = await personDal.countPerson();
  logTrail.push('info', 'personCount', `${personCount}`);

  // no need to insert
  if (personCount) return;
};

const ensureData = async () => {
  if (!ensureDataEnabled) return;

  const logTrail = new AppLogTrail();
  await ensurePersonData(logTrail);
  logTrail.flush();
};

module.exports = ensureData;
