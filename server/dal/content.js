'use strict';

const r = require('./db').r;

/**
 * @param {string} contentKey
 * @param {string} contentValue
 * @returns {Promise<void>}
 */
const upsertContent = async (contentKey, contentValue) => {
  if (!contentKey) {
    throw new Error('Content key need to be a non-empty string');
  }

  await r
    .table('contents')
    .get(contentKey)
    .replace({ contentKey, contentValue });
};

/**
 * @param {string} contentKey
 * @returns {Promise<string>}
 */
const getContent = async contentKey => {
  if (!contentKey) {
    return null;
  }

  return await r
    .table('contents')
    .get(contentKey)('contentValue')
    .default(null);
};

module.exports = {
  upsertContent,
  getContent
};
