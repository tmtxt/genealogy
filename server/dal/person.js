'use strict';

const _ = require('lodash');
const neo4j = require('neo4j-driver').v1;

const models = require('../models');
const { BadDataError } = require('../errors');

const driver = require('./db').driver;

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

  const getPerson = async () => {
    const query = 'MATCH (p:Person) WHERE id(p) = $personId RETURN id(p) AS id, p AS data';
    const res = await session.run(query, { personId: int(personId) });
    return transformSingleResult(res);
  };
  const getMarriages = async () => {
    const query = `MATCH (p:Person)-[r:Husband_wife|Wife_husband]->(m:Person) WHERE id(p) = $personId
                   RETURN id(m) AS id, m AS data ORDER BY r.order`;
    const res = await session.run(query, { personId: int(personId) });
    return _.map(res.records, transformRecord);
  };
  const getChildren = async () => {
    const query = `MATCH (p:Person)-[r:Father_child|Mother_child]->(c:Person) WHERE id(p) = $personId
                   RETURN id(c) AS id, c AS data ORDER BY r.order`;
    const res = await session.run(query, { personId: int(personId) });
    return _.map(res.records, transformRecord);
  };
  const getFather = async () => {
    const query = `MATCH (p:Person)<-[:Father_child]-(f:Person) WHERE id(p) = $personId
                   RETURN id(f) AS id, f AS data`;
    const res = await session.run(query, { personId: int(personId) });
    return transformSingleResult(res);
  };
  const getMother = async () => {
    const query = `MATCH (p:Person)<-[:Mother_child]-(m:Person) WHERE id(p) = $personId
                   RETURN id(m) AS id, m AS data`;
    const res = await session.run(query, { personId: int(personId) });
    return transformSingleResult(res);
  };

  const [person, marriages, children, father, mother] = await Promise.all([
    getPerson(),
    getMarriages(),
    getChildren(),
    getFather(),
    getMother()
  ]);
  return _.assign(person, { marriages, children, father, mother });
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
  childProps.gender = 'male'; // default to male

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

/**
 * Delete 1 person.
 * @param {int} personId
 * @param {LogTrail} logTrail
 * @throws {BadDataError} when person still has children
 */
const removePerson = async (personId, logTrail) => {
  const session = driver.session();

  // check whether this node has any children
  let childrenQuery = '';
  childrenQuery += 'MATCH (p:Person)-[:Father_child|Mother_child]->(child:Person) ';
  childrenQuery += 'WHERE id(p) = $personId ';
  childrenQuery += 'RETURN ';
  childrenQuery += 'count(child) AS `children_count`';
  const childrenRes = await session.run(childrenQuery, { personId: int(personId) });
  const childrenCount = childrenRes.records[0].get('children_count').toInt();
  logTrail.push('info', 'childrenCount', `${childrenCount}`);

  if (childrenCount) {
    throw new BadDataError('This person has children. Remove children first');
  }

  // TODO: check for other parent, mother relation

  // delete the node
  const deleteQuery = 'MATCH (p:Person) WHERE id(p) = $personId DETACH DELETE p';
  await session.run(deleteQuery, { personId: int(personId) });
};

/**
 * Get list of children with the order
 * @param {int} personId
 * @param {AppLogTrail} logTrail
 * @returns {Promise<{id: number, order: number, name: *}[]>}
 */
const getChildrenWithOrder = async (personId, logTrail) => {
  const session = driver.session();
  let query = '';
  query += 'MATCH (person:Person)-[r:Father_child|Mother_child]->(child:Person) ';
  query += 'WHERE id(person) = $personId ';
  query += 'RETURN ';
  query += 'id(child) AS child_id, ';
  query += 'child.name AS child_name, ';
  query += 'r.order AS child_order';

  const res = await session.run(query, { personId: int(personId) });

  return res.records.map(record => ({
    id: record.get('child_id').toInt(),
    order: record.get('child_order').toInt(),
    name: record.get('child_name').toString()
  }));
};

/**
 * Update this person's children order
 * @param {int} personId
 * @param {{id: int, order: int}[]} childrenOrderList
 * @param {AppLogTrail} logTrail
 * @returns {Promise<void>}
 */
const updateChildrenOrder = async (personId, childrenOrderList, logTrail) => {
  const session = driver.session();
  const updateChildOrder = async (childId, childOrder) => {
    let query = '';
    query += 'MATCH (parent:Person)-[r:Father_child|Mother_child]->(child:Person) ';
    query += 'WHERE id(parent) = $parentId AND id(child) = $childId ';
    query += 'SET r.order = $childOrder';
    await session.run(query, {
      parentId: int(personId),
      childId: int(childId),
      childOrder: int(childOrder)
    });
  };

  await Promise.all(_.map(childrenOrderList, item => updateChildOrder(item.id, item.order)));
};

/**
 * Find the shortest relationship between 2 person
 * @param {int} sourcePersonId
 * @param {int} destPersonId
 * @param logTrail
 * @returns {Promise<Array>}
 * {
 *   startPerson: Person,
 *   endPerson: Person,
 *   type: string // relationship type
 * }
 */
const getRelationBetweenPerson = async (sourcePersonId, destPersonId, logTrail) => {
  // query to get the shortest path
  const query = `
  MATCH (from:Person), (to:Person)
  WHERE id(from) = $sourcePersonId AND id(to) = $destPersonId
  WITH
  shortestpath((from)-[*]-(to)) AS path
  RETURN path`;

  const session = driver.session();
  const res = await session.run(query, {
    sourcePersonId: int(sourcePersonId),
    destPersonId: int(destPersonId)
  });

  const record = res.records[0];
  if (!record) {
    throw new Error('No relationships found between 2 nodes');
  }

  const path = record.get('path');
  const segments = path.segments;

  const relations = _.map(segments, segment => {
    const { start, end } = segment;

    const startPerson = _.assign({ id: start.identity.toInt() }, start.properties);
    const endPerson = _.assign({ id: end.identity.toInt() }, end.properties);

    // fix the type
    const type = segment.relationship.type.toString();
    const relStart = segment.relationship.start.toInt();
    if (relStart === startPerson.id) {
      // no need to fix
      return { startPerson, endPerson, type };
    }

    const typeMap = {
      Father_child: 'Child_father',
      Mother_child: 'Child_mother',
      Husband_wife: 'Wife_husband',
      Wife_husband: 'Husband_wife'
    };
    const fixedType = typeMap[type];
    return { startPerson, endPerson, type: fixedType };
  });

  return relations;
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
  addWife,
  removePerson,
  getChildrenWithOrder,
  updateChildrenOrder,
  getRelationBetweenPerson
};
