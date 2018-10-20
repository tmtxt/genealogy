// @flow
import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

type PropsType = {};
export const LoginPage = (props: PropsType) => {
  return (
    <Container>
      <Row>
        <Col md="4" />
        <Col md="4">
          <Form>
            <FormGroup>
              <Label>Tên đăng nhập</Label>
              <Input type="text" />
            </FormGroup>
            <FormGroup>
              <Label>Mật khẩu</Label>
              <Input type="password" />
            </FormGroup>
            <Button>Đăng nhập</Button>
          </Form>
        </Col>
        <Col md="4" />
      </Row>
    </Container>
  );
};

export default LoginPage;
