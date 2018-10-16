import React, { Component } from 'react';
import { requestToApi } from 'react-data-fetching';
import { withAlert } from 'react-alert';

import apiRoutes from 'config/api-routes';

const { Provider, Consumer } = React.createContext();

class ApiProviderWrapper extends Component {
  sendApiRequest = async (routeName, param = {}, query = {}, body = null) => {
    this.props.alert.error('Test error');
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
