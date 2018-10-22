import React, { Component } from 'react';

import { requireLoggedInUser } from '../user';
import { wrapUserConsumer } from '../../contexts';
import ChangePasswordPage from './change-password-page';

class ChangePasswordPageWrapper extends Component {
  state = {
    password: ''
  };

  handlePasswordChange = password => this.setState({ password });
  handleSubmit = () => this.props.userActions.changePassword(this.state.password);

  render() {
    const { password } = this.state;
    const {
      userSelectors: { isChangingPassword }
    } = this.props;

    return (
      <ChangePasswordPage
        onPasswordChange={this.handlePasswordChange}
        onSubmit={this.handleSubmit}
        isChangingPassword={isChangingPassword()}
        {...{ password }}
      />
    );
  }
}

export default requireLoggedInUser(wrapUserConsumer(ChangePasswordPageWrapper));
