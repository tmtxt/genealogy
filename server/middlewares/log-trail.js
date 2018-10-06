'use strict';

const AppLogTrail = require('../logger').AppLogTrail;

const logTrailMiddleware = async (ctx, next) => {
  const logTrail = new AppLogTrail({
    'request.method': ctx.request.method,
    'request.url': ctx.request.url
  });
  try {
    ctx.logTrail = logTrail;
    await next();

    logTrail.extendMetaData({
      'response.status': ctx.response.status
    });
    logTrail.flush();
  } catch (e) {
    logTrail.push('error', 'ERROR', e.message);
    logTrail.flush();
    throw e;
  }
};

module.exports = logTrailMiddleware;
