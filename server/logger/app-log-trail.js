'use strict';

const _ = require('lodash');
const uuid = require('node-uuid');
const winston = require('winston');

const config = require('../config');
const LogTrailBase = require('./log-trail-base');

const { format } = winston;

const logger = winston.createLogger({
  level: config.logLevel || 'info',
  format: format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(info => {
      const { timestamp, level, message, ...args } = info;
      const argsStr = _.chain(args)
        .map((val, key) => `${key}: ${args[key]}`)
        .join('\n')
        .value();
      const ts = timestamp.slice(0, 19).replace('T', ' ');

      return `${ts} [${level}] ${argsStr}\n${message}\n`;
    })
  ),
  transports: [new winston.transports.Console()]
});

class AppLogTrail extends LogTrailBase {
  constructor(metaData) {
    metaData = metaData || {};
    metaData.correlationId = metaData.correlationId || uuid.v4();
    super(metaData, logger);
  }
}

module.exports = AppLogTrail;
