// @flow
import React, { Component } from 'react';

import LoginPage from './login-page';

class LoginPageWrapper extends Component {
  static displayName = 'LoginPageWrapper';

  render() {
    return <LoginPage />;
  }
}

export default LoginPageWrapper;
