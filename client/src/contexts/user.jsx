import React, { Component } from 'react';
import { fromJS, Map as ImmutableMap, List as ImmutableList } from 'immutable';
import { withAlert } from 'react-alert';

import { wrapApiConsumer } from './api';

const { Provider, Consumer } = React.createContext();

class UserProviderWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // data
      userStore: fromJS({}),

      // actions
      userActions: {
        login: this.login
      },

      // selectors
      userSelectors: {}
    };
  }

  login = async (username, password) => {
    await this.props.sendApiRequest('user.login', null, null, { username, password });
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
const EnhancedUserProviderWrapper = withAlert(wrapApiConsumer(UserProviderWrapper));

export const wrapUserProvider = WrappedComponent => props => (
  <EnhancedUserProviderWrapper>
    <WrappedComponent {...props} />
  </EnhancedUserProviderWrapper>
);

export const wrapUserConsumer = WrappedComponent => props => (
  <Consumer>{values => <WrappedComponent {...props} {...values} />}</Consumer>
);
