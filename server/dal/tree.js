'use strict';

const _ = require('lodash');
const neo4j = require('neo4j-driver').v1;

const driver = require('./db').driver;

const int = neo4j.int;

/**
 * Get the tree data from 1 person node
 *
 * @param {int} rootNodeId
 *
 * @param {LogTrail} logTrail
 *
 * @returns {object} Returns a recursive structure, represented by TreeNode. The schema of each node like this
 * {
 *   id:        <int>             id of the person node
 *   order:     <int>             the child order of this node
 *   marriages: Array<Person>     list of other person nodes getting marriage to this person
 *   info:      <Person>          the person node properties
 *   children:  Array<TreeNode>   recursive structure
 *   idPath:    Array<int>        the id path to this node
 * }
 *
 * @throws {Error}
 */
const getTreeByPersonId = async (rootNodeId, logTrail) => {
  const session = driver.session();

  let query = '';

  // match by the Father_child or Mother_child relation from the root node, down deep maximum 5 levels
  query +=
    'MATCH p=(root:Person)-[:Father_child|Mother_child *0..5]->(child:Person) WHERE id(root) = $rootNodeId ';
  query += 'WITH ';
  query += 'nodes(p) AS all_nodes, '; // all nodes in 1 matched relation
  query += 'last(relationships(p)) AS last_relationship, '; // all relationships in 1 matched relation
  query += 'relationships(p) AS all_relationships, '; // all relationships in 1 matched relation
  query += 'length(p) AS depth, '; // the depth of the current relation
  // also query the marriage of each node (to display on the tree)
  query +=
    'extract(n IN (child)-[:Husband_wife|Wife_husband]->(:Person) | last(nodes(n))) AS marriages ';
  // beginning returning data
  query += 'RETURN ';
  query += 'id(last(all_nodes)) AS `id`, ';
  query += 'last(all_nodes) AS `node_info`, ';
  query += 'extract(n IN all_nodes | id(n)) AS `path`, '; // list of ids as the path from root node to this node
  query += 'coalesce(last(extract(r IN all_relationships | r.`order`)), 1) AS `child_order`,';
  query += 'marriages AS `marriages` '; // list of all people get marriage to this node
  query += 'ORDER BY `depth`';

  const res = await session.run(query, { rootNodeId: int(rootNodeId) });
  const records = res.records;
  logTrail.push('info', 'getTreeByPersonId', `Found ${records.length} nodes`);

  if (!records.length) {
    throw new Error(`personId ${rootNodeId} not found`);
  }

  const tree = {};
  for (let record of records) {
    let path = record.get('path').map(id => id.toInt());
    // remove the first item in the path because it's
    path = _.tail(path);
    const idPath = path;
    // set the current person info using the children path
    path = _.chain(path)
      .map(id => ['children', `id-${id}`])
      .flatten()
      .value();

    // set value to the tree
    _.set(tree, path.concat(['id']), record.get('id').toInt());
    _.set(tree, path.concat(['order']), record.get('child_order').toInt());
    _.set(tree, path.concat(['info']), record.get('node_info').properties);
    _.set(
      tree,
      path.concat(['marriages']),
      record.get('marriages').map(marriage => marriage.properties)
    );
    _.set(tree, path.concat(['idPath']), idPath);
  }

  // transform the children prop from object to an array
  const transformChildren = node => {
    if (node.children) {
      _.each(tree.children, transformChildren);
      node.children = _.chain(node.children)
        .values()
        .sortBy(['order'])
        .value();
    }
  };
  transformChildren(tree);

  // logTrail.push('info', 'tree', tree);
  return tree;
};

module.exports = {
  getTreeByPersonId
};
