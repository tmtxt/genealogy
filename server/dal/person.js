'use strict';

const _ = require('lodash');

const driver = require('./db').driver;

const models = require('./models');

/**
 * Count total number of person node in the database
 *
 * @param   {LogTrail}  logTrail
 *
 * @returns {int}
 */
const countPerson = async logTrail => {
  const session = driver.session();
  const res = await session.run('MATCH (person:Person) RETURN count(*) AS countPerson');

  const personCount = res.records[0].get('countPerson').toInt();
  logTrail.push('info', 'personCount', `${personCount}`);

  return personCount;
};

/**
 * Insert a root person
 *
 * @param {Person} person
 *
 * @param {LogTrail} logTrail
 */
const insertRootPerson = async (person, logTrail) => {
  const props = _.assign({}, person, { isRoot: true });
  person = new models.Person(props);

  const session = driver.session();
  const query = 'CREATE (person:Person {isRoot: $isRoot, name: $name})';
  await session.run(query, person);

  logTrail.push('info', 'insertRootPerson', 'DONE');
};

/**
 * Get the root person from database
 *
 * @param {LogTrail} logTrail
 *
 * @returns {Person}
 */
const getRootPerson = async (logTrail) => {
  const session = driver.session();
  const query = 'MATCH (person:Person {isRoot: true}) RETURN person';
  const res = await session.run(query);

  const record = res.records[0];
  if (!record) {
    logTrail.push('error', 'getRootPerson', 'Root person not found');
    return null;
  }

  const root = record.get(0);
  return root.properties;
};

module.exports = {
  countPerson,
  insertRootPerson,
  getRootPerson
};
