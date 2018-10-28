'use strict';

const _ = require('lodash');

const config = require('../config');
const r = require('../dal/db').r;

const rethinkdbConfig = config.rethinkdb;

const ensureDatabase = async logTrail => {
  const dbList = await r.dbList();

  if (_.includes(dbList, rethinkdbConfig.db)) {
    logTrail.push('info', 'ensureDatabase', 'Database already exists');
    return;
  }

  await r.dbCreate(rethinkdbConfig.db);
  logTrail.push('info', 'ensureDatabase', 'Database created');
};

const ensureUsersTable = async (tableList, logTrail) => {
  if (_.includes(tableList, 'users')) {
    logTrail.push('info', 'ensureTables', 'users table already exists');
    return;
  }

  await r.tableCreate('users', { primaryKey: 'username' });
  logTrail.push('info', 'ensureTables', 'users table created');
};

const ensureContentsTable = async (tableList, logTrail) => {
  if (_.includes(tableList, 'contents')) {
    logTrail.push('info', 'ensureTables', 'contents table already exists');
    return;
  }

  await r.tableCreate('contents', { primaryKey: 'contentKey' });
  logTrail.push('info', 'ensureTables', 'contents table created');
};

const ensureTables = async logTrail => {
  const tableList = await r.tableList();

  await ensureUsersTable(tableList, logTrail);
  await ensureContentsTable(tableList, logTrail);
};

const ensure = async logTrail => {
  await ensureDatabase(logTrail);

  await ensureTables(logTrail);
};

module.exports = ensure;
