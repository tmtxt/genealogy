'use strict';

const _ = require('lodash');
const crypto = require('crypto');

const User = require('../models/').User;
const config = require('../config');

const r = require('./db').r;

const encryptKey = config.encryptKey;

const encryptPassword = password =>
  crypto
    .createHmac('sha256', encryptKey)
    .update(password)
    .digest('hex');

/**
 * Insert new user
 * @param {User} userProps
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

/**
 * Compare whether the input raw password matches the encrypted user password in dabase
 * @param {string} username
 * @param {string} password
 * @returns {boolean}
 */
const comparePassword = async (username, password) => {
  if (!password) return false;

  const user = await r.table('users').get(username);
  if (!user) return false;

  const encrypted = encryptPassword(password);

  return encrypted === user.password;
};

/**
 * Change password
 * @param {string} username
 * @param {string} newPassword
 * @returns {Promise<boolean>}
 */
const changePassword = async (username, newPassword) => {
  if (!newPassword) throw new Error('newPassword cannot be empty');

  const encrypted = encryptPassword(newPassword);

  const res = await r
    .table('users')
    .get(username)
    .update({ password: encrypted });
  
  return !!res.replaced;
};

module.exports = {
  addNewUser,
  comparePassword,
  changePassword
};
