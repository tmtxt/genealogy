'use strict';

const neo4j = require('neo4j-driver').v1;

const config = require('../../config');
const neo4jConfig = config.neo4j;

const driver = neo4j.driver(
  `bolt://${neo4jConfig.server}:${neo4jConfig.port}`,
  neo4j.auth.basic(neo4jConfig.user, neo4jConfig.password)
);

module.exports = {
  driver                        // neo4j driver
};
