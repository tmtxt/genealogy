'use strict';

module.exports = {
  port: parseInt(process.env.BACKEND_PORT) || 80,
  ensureDataEnabled: process.env.ENSURE_DATA_ENABLED === 'true',
  logLevel: process.env.LOG_LEVEL || 'info',
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
  },

  app: {
    pageTitle: process.env.PAGE_TITLE || 'Trần Văn Gia Phả',
    pageHeadline: process.env.PAGE_HEADLINE || 'Gìn giữ cho muôn đời sau',
    carousel: {
      image1: process.env.CAROUSEL_IMAGE1,
      header1: process.env.CAROUSEL_HEADER1,
      image2: process.env.CAROUSEL_IMAGE2,
      header2: process.env.CAROUSEL_HEADER2,
      image3: process.env.CAROUSEL_IMAGE3,
      header3: process.env.CAROUSEL_HEADER3,
      image4: process.env.CAROUSEL_IMAGE4,
      header4: process.env.CAROUSEL_HEADER4,
      image5: process.env.CAROUSEL_IMAGE5,
      header5: process.env.CAROUSEL_HEADER5
    }
  }
};
