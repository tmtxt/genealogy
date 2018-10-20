// @flow
import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { withRouter } from 'react-router';

import { navigateToHomePage } from 'libs/navigation';

class LoginPage extends Component {
  componentDidUpdate(prevProps) {
    const { user: prevUser } = prevProps;
    const { user: currentUser } = this.props;

    if (
      prevUser.get('isLoggingIn') &&
      !currentUser.get('isLoggingIn') &&
      currentUser.get('isLoggedIn')
    ) {
      navigateToHomePage(this.props.history);
    }
  }

  render() {
    const { username, password, login, handleUsernameChanged, handlePasswordChanged } = this.props;

    return (
      <Container>
        <Row>
          <Col md="4" />
          <Col md="4">
            <Form>
              <FormGroup>
                <Label>Tên đăng nhập</Label>
                <Input
                  type="text"
                  value={username}
                  onChange={e => handleUsernameChanged(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Mật khẩu</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={e => handlePasswordChanged(e.target.value)}
                />
              </FormGroup>
              <Button onClick={login}>Đăng nhập</Button>
            </Form>
          </Col>
          <Col md="4" />
        </Row>
      </Container>
    );
  }
}

export default withRouter(LoginPage);
