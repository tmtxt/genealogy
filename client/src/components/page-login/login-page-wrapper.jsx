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

  componentDidMount() {
    this.props.userActions.clearCurrentUser();
  }

  render() {
    const { login, handleUsernameChanged, handlePasswordChanged } = this;
    const { username, password } = this.state;
    const {
      userSelectors: { selectCurrentUser }
    } = this.props;
    const user = selectCurrentUser();

    return (
      <LoginPage
        {...{ username, password, login, handleUsernameChanged, handlePasswordChanged, user }}
      />
    );
  }
}

export default wrapUserConsumer(LoginPageWrapper);
