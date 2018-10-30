'use strict';

const _ = require('lodash');

const dal = require('../dal');

const contentDal = dal.content;

// POST /contents/:contentKey
// Request body
// {
//   contentValue: <string>
// }
const upsertContent = async ctx => {
  const logTrail = ctx.logTrail;
  const contentKey = ctx.params.contentKey;
  const contentValue = ctx.request.body.contentValue;

  if (!_.includes(['preface', 'general-info', 'history'], contentKey)) {
    ctx.responseError(405, 'Not allowed');
  }

  await contentDal.upsertContent(contentKey, contentValue, logTrail);

  ctx.body = {
    contentKey,
    contentValue
  };
};

// GET /contents/:contentKey
// Response
// {
//   contentKey: <string>,
//   contentValue: <string>
// }
const getContent = async ctx => {
  const logTrail = ctx.logTrail;
  const contentKey = ctx.params.contentKey;

  const contentValue = await contentDal.getContent(contentKey, logTrail);
  ctx.body = { contentKey, contentValue: contentValue || '' };
};

module.exports = { upsertContent, getContent };
