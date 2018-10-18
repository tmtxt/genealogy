'use strict';

const ensureDatabase = require('./database');
const ensureData = require('./data');

const config = require('../config');
const AppLogTrail = require('../logger').AppLogTrail;

const ensureDataEnabled = config.ensureDataEnabled;

// init database + initial data before starting the app
const initApp = async () => {
  if (!ensureDataEnabled) return;

  const logTrail = new AppLogTrail();
  await ensureDatabase(logTrail);
  await ensureData(logTrail);
  logTrail.flush();
};

module.exports = initApp;
