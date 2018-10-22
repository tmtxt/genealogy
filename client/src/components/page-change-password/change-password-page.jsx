import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import { Loader } from '../shared';
import { navigateToLoginPage } from '../../libs/navigation';

class ChangePasswordPage extends Component {
  componentDidUpdate(prevProps) {
    const { isChangingPassword: prevChanging } = prevProps;
    const { isChangingPassword: currentChanging, history } = this.props;

    if (prevChanging && !currentChanging) {
      navigateToLoginPage(history);
    }
  }

  render() {
    const { password, onPasswordChange, onSubmit, isChangingPassword } = this.props;

    return (
      <Row>
        <Col md="4" />
        <Col md="4">
          <Form>
            <FormGroup>
              <Label>Mật khẩu</Label>
              <Input
                type="password"
                value={password}
                onChange={e => onPasswordChange(e.target.value)}
              />
            </FormGroup>
            <Button color="primary" disabled={isChangingPassword} onClick={onSubmit}>
              Đổi mật khẩu
            </Button>
            {isChangingPassword && <Loader />}
          </Form>
        </Col>
        <Col md="4" />
      </Row>
    );
  }
}

export default withRouter(ChangePasswordPage);
