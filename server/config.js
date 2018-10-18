'use strict';

module.exports = {
  port: parseInt(process.env.BACKEND_PORT) || 80,
  ensureDataEnabled: process.env.ENSURE_DATA_ENABLED === 'true',
  logLevel: process.env.LOG_LEVEL,
  // for cookie
  secretKey: process.env.SECRET_KEY || 'secret-key',
  // for user auth
  encryptKey: process.env.ENCRYPT_KEY || 'encrypt-key',

  neo4j: {
    server: process.env.NEO4J_SERVER || 'localhost',
    port: process.env.NEO4J_PORT || '30003',
    user: process.env.NEO4J_USER || 'neo4j',
    password: process.env.NEO4J_PASSWORD || ''
  },

  rethinkdb: {
    host: process.env.RETHINKDB_HOST || 'localhost',
    port: process.env.RETHINKDB_PORT || '30005',
    db: process.env.RETHINKDB_DB || 'genealogy'
  }
};
