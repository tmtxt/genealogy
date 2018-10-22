import React, { Component } from 'react';

import { requireLoggedInUser } from '../user';
import { wrapUserConsumer } from '../../contexts';
import ChangePasswordPage from './change-password-page';

class ChangePasswordPageWrapper extends Component {
  state = {
    password: ''
  };

  handlePasswordChange = password => this.setState({ password });

  render() {
    const { password } = this.state;
    return <ChangePasswordPage onPasswordChange={this.handlePasswordChange} {...{ password }} />;
  }
}

export default requireLoggedInUser(wrapUserConsumer(ChangePasswordPageWrapper));
