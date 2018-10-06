'use strict';

const _ = require('lodash');

const driver = require('./db').driver;

const models = require('./models');

/**
 * Transform a person record returned from the query.
 * The record should have 2 fields, id and data
 *
 * @param {neo4j.v2.Record} record
 *
 * @return {Person}
 *
 */
const transformPersonRecord = record => {
  const person = record.get('data').properties;
  const id = record.get('id').toInt();

  return _.assign({}, person, { id });
};

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
const getRootPerson = async logTrail => {
  const session = driver.session();
  const query = 'MATCH (person:Person {isRoot: true}) RETURN id(person) AS id, person AS data';
  const res = await session.run(query);

  const record = res.records[0];
  if (!record) {
    logTrail.push('error', 'getRootPerson', 'Root person not found');
    return null;
  }

  return transformPersonRecord(record);
};

/**
 * Get one person by id
 *
 * @param {int} personId
 *
 * @param {LogTrail} logTrail
 *
 * @returns {Person}
 */
const getPersonById = async (personId, logTrail) => {
  const session = driver.session();
  const query =
    'MATCH (person:Person) WHERE id(person) = toInteger($personId) RETURN id(person) AS id, person AS data';
  const res = await session.run(query, { personId: parseInt(personId) });

  const record = res.records[0];
  if (!record) {
    logTrail.push('warn', `getPersonById - ${personId}`, 'NOT FOUND');
    return null;
  }

  return transformPersonRecord(record);
};

module.exports = {
  countPerson,
  insertRootPerson,
  getRootPerson,
  getPersonById
};
