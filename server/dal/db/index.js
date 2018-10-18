'use strict';

const neo4j = require('neo4j-driver').v1;
const Rethinkdbdash = require('rethinkdbdash');

const config = require('../../config');

// neo4j
const neo4jConfig = config.neo4j;
const driver = neo4j.driver(
  `bolt://${neo4jConfig.server}:${neo4jConfig.port}`,
  neo4j.auth.basic(neo4jConfig.user, neo4jConfig.password)
);

// rethinkdb
const rethinkdbConfig = config.rethinkdb;
const r = Rethinkdbdash({
  host: rethinkdbConfig.host,
  port: rethinkdbConfig.port
});

module.exports = {
  driver, // neo4j driver
  r // rethinkdb connection
};
