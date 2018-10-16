import React, { Component } from 'react';
import { requestToApi } from 'react-data-fetching';
import { withAlert } from 'react-alert';
import UrlPattern from 'url-pattern';

import apiRoutes from 'config/api-routes';

const { Provider, Consumer } = React.createContext();

class ApiProviderWrapper extends Component {
  /**
   * Send api request with error handler
   * @param {string} routeName the route name (the key) in api apiRoutes config
   * @param {object?} param route params
   * @param {object?} query query string opts
   * @param {object?} null
   * @return {object?} api response body
   */
  sendApiRequest = async (routeName, param = {}, query = {}, body = null) => {
    const routeConfig = apiRoutes[routeName];
    if (!routeConfig) {
      this.props.alert.error(`Invalid API route name ${routeName}`);
      return;
    }

    const url = new UrlPattern(routeConfig.path).stringify(param);
    try {
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
    } catch (e) {
      this.props.alert.error(e.message || e.response || 'An error occured');
      throw e;
    }
  };

  render() {
    return (
      <Provider value={{ sendApiRequest: this.sendApiRequest }}>{this.props.children}</Provider>
    );
  }
}
const ApiProviderWrapperWithAlert = withAlert(ApiProviderWrapper);

export const wrapApiProvider = WrappedComponent => props => (
  <ApiProviderWrapperWithAlert>
    <WrappedComponent {...props} />
  </ApiProviderWrapperWithAlert>
);

export const wrapApiConsumer = WrappedComponent => props => (
  <Consumer>{values => <WrappedComponent {...props} {...values} />}</Consumer>
);
