'use strict';

const driver = require('./db').driver;

/**
 * Count total number of person node in the database
 *
 * @returns {int}
 */
const countPerson = async () => {
  const session = driver.session();
  const res = await session.run('MATCH (person:Person) RETURN count(*) AS countPerson');

  return res.records[0].get('countPerson').toInt();
};

module.exports = {
  countPerson
};
