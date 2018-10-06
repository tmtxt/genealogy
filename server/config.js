'use strict';

module.exports = {
  port: parseInt(process.env.BACKEND_PORT) || 80,

  ensureDataEnabled: process.env.ENSURE_DATA_ENABLED === 'true',

  logLevel: process.env.LOG_LEVEL
};
