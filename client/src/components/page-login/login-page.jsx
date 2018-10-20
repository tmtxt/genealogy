// @flow
import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

export const LoginPage = ({
  username,
  password,
  login,
  handleUsernameChanged,
  handlePasswordChanged
}) => {
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
};

export default LoginPage;
