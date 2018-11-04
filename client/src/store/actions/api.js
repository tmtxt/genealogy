// helper file for sending api request

import UrlPattern from 'url-pattern';
import { requestToApi } from 'react-data-fetching';

import apiRoutes from 'config/api-routes';

export default async (routeName, param = {}, query = {}, body = null, opts = {}) => {
  const routeConfig = apiRoutes[routeName];
  if (!routeConfig) {
    throw new Error('No API Route found');
  }

  const url = new UrlPattern(routeConfig.path).stringify(param);
  const requestOpts = {
    url,
    body,
    method: routeConfig.method.toUpperCase()
  };
  const res = await requestToApi(requestOpts);

  if (!res.isOK) {
    throw new Error(res.data);
  }

  return res.data;
};
