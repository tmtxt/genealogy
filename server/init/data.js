'use strict';
// ensure some data for the app to run

const config = require('../config');
const ensureDataEnabled = config.ensureDataEnabled;

const ensurePersonData = async () => {
  console.log('----------------------------------------------------------------------');
  console.log('hello');
  console.log('----------------------------------------------------------------------');
};

const ensureData = async () => {
  if (!ensureDataEnabled) return;

  await ensurePersonData();
};

module.exports = ensureData;
