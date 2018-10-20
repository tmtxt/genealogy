import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { withAlert } from 'react-alert';
import Cookies from 'js-cookie';

import { wrapApiConsumer } from './api';

const { Provider, Consumer } = React.createContext();

const defaultUser = fromJS({
  username: null,
  isLoggedIn: false,
  isLoggingIn: false
});

class UserProviderWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // data
      userStore: defaultUser,

      // actions
      userActions: {
        login: this.login,
        logout: this.logout,
        clearCurrentUser: this.clearCurrentUser
      },

      // selectors
      userSelectors: {
        selectCurrentUser: this.selectCurrentUser,
        isLoggedIn: this.isLoggedIn
      }
    };
  }

  isLoggedIn = () => this.state.userStore.get('isLoggedIn');

  setUserFromCookies = () => {
    const username = Cookies.get('username');
    const password = Cookies.get('password');

    if (!username || !password) return;

    this.login(username, password, true);
  };

  componentDidMount() {
    this.setUserFromCookies();
  }

  selectCurrentUser = () => this.state.userStore;

  clearCurrentUser = () => this.setState({ userStore: defaultUser });

  logout = async () => {
    await this.props.sendApiRequest('user.logout');
    this.clearCurrentUser();
  };

  /**
   * Login through API
   * @param {string} username
   * @param {string} password
   * @param {boolean} ignoreAlert
   */
  login = async (username, password, ignoreAlert) => {
    let { userStore } = this.state;
    this.setState({ userStore: userStore.set('isLoggingIn', true) });

    try {
      await this.props.sendApiRequest(
        'user.login',
        null,
        null,
        { username, password },
        { ignoreAlert }
      );

      userStore = this.state.userStore;
      this.setState({
        userStore: userStore
          .set('username', username)
          .set('isLoggingIn', false)
          .set('isLoggedIn', true)
      });
    } catch (e) {
      this.setState({ userStore: userStore.set('isLoggingIn', false) });
    }
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
