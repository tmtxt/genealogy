// @flow
import React, { Component } from 'react';

import { wrapUserConsumer } from 'contexts';

import LoginPage from './login-page';

class LoginPageWrapper extends Component {
  static displayName = 'LoginPageWrapper';

  state = {
    username: '',
    password: ''
  };

  login = () => {
    const { username, password } = this.state;
    this.props.userActions.login(username, password);
  };

  handleUsernameChanged = username => this.setState({ username });
  handlePasswordChanged = password => this.setState({ password });

  render() {
    const { username, password } = this.state;
    const { login, handleUsernameChanged, handlePasswordChanged } = this;

    return (
      <LoginPage {...{ username, password, login, handleUsernameChanged, handlePasswordChanged }} />
    );
  }
}

export default wrapUserConsumer(LoginPageWrapper);
