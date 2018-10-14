'use strict';

const _ = require('lodash');
const neo4j = require('neo4j-driver').v1;

const driver = require('./db').driver;

const models = require('../models');

const int = neo4j.int;

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
  const query = 'CREATE (person:Person $personData) RETURN id(person) AS id, person AS data';
  const res = await session.run(query, { personData: person });

  const rootPerson = transformSingleResult(res);
  if (!rootPerson) {
    throw new Error('Cannot insert root person');
  }

  logTrail.push('info', 'insertRootPerson', `Root person id: ${rootPerson.id}`);
  return rootPerson;
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

/**
 * Get person details with the connected relations
 *
 * @param {int} personId
 *
 * @param {LogTrail} logTrail
 *
 * @returns {Person} The person object with these extra props
 * {
 *   marriages: Array<Person>,
 *   children: Array<Person>,
 *   father?: <Person>
 *   mother?: <Person>
 * }
 */
const getPersonByIdWithRelations = async (personId, logTrail) => {
  const session = driver.session();
  let query = '';
  query += 'MATCH (person:Person) WHERE id(person) = $personId ';
  query += 'WITH ';
  query += 'person AS person, ';
  query +=
    'extract(n IN (person)-[:Husband_wife|Wife_husband]->(:Person) | last(nodes(n))) AS marriages, ';
  query +=
    'extract(n IN (person)-[:Father_child|Mother_child]->(:Person) | last(nodes(n))) AS children, ';
  query += 'extract(n IN (person)<-[:Father_child]-(:Person) | last(nodes(n))) AS fathers, ';
  query += 'extract(n IN (person)<-[:Mother_child]-(:Person) | last(nodes(n))) AS mothers ';
  query += 'RETURN ';
  query += 'id(person) AS id, ';
  query += 'person AS data, ';
  query +=
    'extract(marriage in marriages | {id: id(marriage), node_info: marriage}) AS marriages, ';
  query += 'extract(child in children | {id: id(child), node_info: child}) AS children, ';
  query += 'extract(father in fathers | {id: id(father), node_info: father}) AS fathers, ';
  query += 'extract(mother in mothers | {id: id(mother), node_info: mother}) AS mothers ';

  const res = await session.run(query, { personId: int(personId) });
  const person = transformSingleResult(res);

  if (!person) return null;

  const record = res.records[0];

  // set marriages
  person.marriages = record
    .get('marriages')
    .map(marriage => _.assign({ id: marriage.id.toInt() }, marriage.node_info.properties));
  logTrail.push('info', '# marriages', record.get('marriages').length);

  // set children
  person.children = record
    .get('children')
    .map(child => _.assign({ id: child.id.toInt() }, child.node_info.properties));
  logTrail.push('info', '# children', record.get('children').length);

  // set father
  person.father = null;
  const fathers = record.get('fathers');
  if (fathers.length) {
    logTrail.push('info', 'Has father', 'TRUE');
    person.father = _.first(fathers);
  }

  // set mother
  person.mother = null;
  const mothers = record.get('mothers');
  if (mothers.length) {
    logTrail.push('info', 'Has mother', 'TRUE');
    person.mother = _.first(mothers);
  }

  return person;
};

/**
 * Update one person props by id
 *
 * @param {int} personId
 *
 * @param {PersonUpdate} updatingProps
 *
 * @param {LogTrail} logTrail
 *
 * @returns {Person} the updated person
 */
const updatePersonById = async (personId, updatingProps, logTrail) => {
  const session = driver.session();
  const query = `MATCH (person:Person)
                WHERE id(person) = toInteger($personId)
                SET person += $updatingProps
                RETURN id(person) AS id, person AS data`;
  const res = await session.run(query, {
    personId,
    updatingProps: new models.PersonUpdate(updatingProps)
  });

  return transformSingleResult(res);
};

/**
 * Add a new child
 *
 * @param {int} fatherPersonId
 *
 * @param {int} motherPersonId
 *
 * @param {int} childOrder the order of the child, default to 1
 *
 * @param {Person} childProps initial child props
 *
 * @param {LogTrail} logTrail
 *
 * @returns {Person} the child person object

 * @throws {Exception Type}
 */
const addChild = async (fatherPersonId, motherPersonId, childOrder, childProps, logTrail) => {
  childOrder = childOrder || 1;
  childProps = new models.Person(childProps || {});

  const session = driver.session();
  const query = `MATCH (father:Person) WHERE id(father) = toInteger($fatherPersonId)
                 MATCH (mother:Person) WHERE id(mother) = toInteger($motherPersonId)
          CREATE (father)-[:Father_child {order: toInteger($childOrder)}]->(child:Person $childProps)<-[:Mother_child {order: toInteger($childOrder)}]-(mother)
          RETURN id(child) AS id, child AS data`;

  const res = await session.run(query, { fatherPersonId, motherPersonId, childOrder, childProps });
  const child = transformSingleResult(res);

  if (!child) {
    throw new Error('Cannot insert child');
  }

  logTrail.push(
    'info',
    'addChild',
    `Added child for ${fatherPersonId} and ${motherPersonId} - id: ${child.id}`
  );
  return child;
};

/**
 * Add a new husband for this person
 *
 * @param {int} wifeId
 *
 * @param {int} husbandOrder default to 1
 *
 * @param {int} wifeOrder default to 1
 *
 * @param {Person} husbandProps initial husband person props
 *
 * @param {LogTrail} logTrail
 *
 * @returns {Person} the husband person object
 */
const addHusband = async (wifeId, husbandOrder, wifeOrder, husbandProps, logTrail) => {
  husbandOrder = husbandOrder || 1;
  wifeOrder = wifeOrder || 1;
  husbandProps = new models.Person(husbandProps || {});
  husbandProps.gender = 'male';

  const session = driver.session();
  const query = `MATCH (wife:Person) WHERE id(wife) = toInteger($wifeId)
        CREATE (wife)-[:Wife_husband {order: toInteger($husbandOrder)}]->(husband:Person $husbandProps)-[:Husband_wife {order: toInteger($wifeOrder)}]->(wife)
        RETURN id(husband) AS id, husband AS data`;

  const res = await session.run(query, { wifeId, husbandOrder, wifeOrder, husbandProps });
  const husband = transformSingleResult(res);

  if (!husband) {
    throw new Error('Cannot insert husband');
  }

  logTrail.push('info', 'addHusband', `Added husband for ${wifeId} - id: ${husband.id}`);
  return husband;
};

/**
 * Add a new wife for this person
 *
 * @param {int} husbandId
 *
 * @param {int} wifeOrder default to 1
 *
 * @param {int} husbandOrder default to 1
 *
 * @param {Person} wifeProps initial wife person props
 *
 * @param {LogTrail} logTrail
 *
 * @returns {Person} the wife person object
 */
const addWife = async (husbandId, wifeOrder, husbandOrder, wifeProps, logTrail) => {
  husbandOrder = husbandOrder || 1;
  wifeOrder = wifeOrder || 1;
  wifeProps = new models.Person(wifeProps);
  wifeProps.gender = 'female';

  const session = driver.session();
  const query = `MATCH (husband:Person) WHERE id(husband) = toInteger($husbandId)
        CREATE (husband)-[:Husband_wife {order: toInteger($wifeOrder)}]->(wife:Person $wifeProps)-[:Wife_husband {order: toInteger($husbandOrder)}]->(husband)
        RETURN id(wife) AS id, wife AS data`;

  const res = await session.run(query, { husbandId, husbandOrder, wifeOrder, wifeProps });
  const wife = transformSingleResult(res);

  if (!wife) {
    throw new Error('Cannot insert wife');
  }

  logTrail.push('info', 'addWife', `Added wife for ${husbandId} - id: ${wife.id}`);
  return wife;
};

module.exports = {
  countPerson,
  insertRootPerson,
  getRootPerson,
  getPersonById,
  getPersonByIdWithRelations,
  updatePersonById,
  addChild,
  addHusband,
  addWife
};
