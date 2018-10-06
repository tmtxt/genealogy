'use strict';

const _ = require('lodash');

const driver = require('./db').driver;

const models = require('./models');

/**
 * Transform a person record returned from the query.
 * The record should have 2 fields, id and data
 * The query returns this record should return like this
 * RETURN id(person) AS id, person AS data
 *
 * @param {neo4j.v2.Record} record
 *
 * @return {Person}
 *
 */
const transformRecord = record => {
  const person = record.get('data').properties;
  const id = record.get('id').toInt();

  return _.assign({}, person, { id });
};

/**
 * Transform a result which has only maximum 1 row returned
 * The row should have 2 fields, id and data
 * The query returns this row should return like this
 * RETURN id(person) AS id, person AS data
 *
 * @param {neo4j.v2.Result} record
 *
 * @return {Person}                 Return null when no record
 *
 */
const transformSingleResult = result => {
  const record = result.records[0];
  if (!record) {
    return null;
  }

  return transformRecord(record);
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
 * @returns {Person}            Returns null if no root person
 */
const getRootPerson = async logTrail => {
  const session = driver.session();
  const query = 'MATCH (person:Person {isRoot: true}) RETURN id(person) AS id, person AS data';
  const res = await session.run(query);

  return transformSingleResult(res);
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

  return transformSingleResult(res);
};

const updatePersonById = async (personId, updatingProps, logTrail) => {
  const session = driver.session();
  const query = `MATCH (person:Person)
                WHERE id(person) = toInteger($personId)
                SET person += $updatingProps
                RETURN id(person) AS id, person AS data`;
  const res = await session.run(query, { personId, updatingProps });

  return transformSingleResult(res);
};

module.exports = {
  countPerson,
  insertRootPerson,
  getRootPerson,
  getPersonById,
  updatePersonById
};
