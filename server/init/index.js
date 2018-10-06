'use strict';

const ensureData = require('./data');

// init database + initial data before starting the app
const initApp = async () => {
  await ensureData();
};

module.exports = initApp;
