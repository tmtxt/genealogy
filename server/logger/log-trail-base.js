'use strict';

const _ = require('lodash');

const defaultOpts = {};

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4
};

class LogTrailBase {
  constructor(metaData, logger, opts) {
    this.metaData = metaData || {};
    this.logger = logger;
    this.opts = _.assign({}, defaultOpts, opts);

    this.logEntries = [];
    this.messages = [];
  }

  push(level, title, message) {
    const messageEntry = {
      createdAt: Date.now(),
      level,
      levelValue: levels[level],
      title,
      message
    };
    this.messages.push(messageEntry);
  }

  flush() {
    const messageStr = this.formatMessages();
    const level = this.detectLogLevel();
    const metaData = this.metaData;

    this.logger[level](messageStr, metaData);
  }

  detectLogLevel() {
    return _.chain(this.messages).maxBy('levelValue').get('level', 'info').value();
  }

  formatMessages() {
    const messages = this.messages;
    const formatEntry = (logEntry, idx) => {
      return `[${idx + 1}] ${logEntry.level.toUpperCase()} ${logEntry.title} : ${logEntry.message}`;
    };
    const messageStr = _.chain(messages).map(formatEntry).join('\n').value();

    return messageStr;
  }
}

module.exports = LogTrailBase;
