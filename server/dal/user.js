'use strict';

const _ = require('lodash');
const crypto = require('crypto');

const User = require('../models/').User;
const config = require('../config');

const r = require('./db').r;

const encryptKey = config.encryptKey;

/**
 * Insert new user
 *
 * @param {User} userProps
 *
 * @throws {Error}
 */
const addNewUser = async userProps => {
  const user = new User(userProps);
  user.password = crypto
    .createHmac('sha256', encryptKey)
    .update(user.password)
    .digest('hex');

  const res = await r.table('users').insert(user);

  if (!res.inserted) {
    throw new Error('Fail to insert user');
  }

  return _.omit(user, ['password']);
};

module.exports = {
  addNewUser
};
