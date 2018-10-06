'use strict';
// ensure some data for the app to run

const AppLogTrail = require('../logger').AppLogTrail;

const config = require('../config');
const ensureDataEnabled = config.ensureDataEnabled;

const ensurePersonData = async (logTrail) => {
  logTrail.push('info', 'hello', 'content1');
  logTrail.push('verbose', 'def', 'hello');
  logTrail.push('error', 'nv', 'content2');
  logTrail.flush();
};

const ensureData = async () => {
  if (!ensureDataEnabled) return;

  const logTrail = new AppLogTrail();
  await ensurePersonData(logTrail);
};

module.exports = ensureData;
