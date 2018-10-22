// @flow
import React from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { Loader } from '../shared';

export const ChangePasswordPage = ({ password, onPasswordChange }) => {
  return (
    <Row>
      <Col md="4">.col-3</Col>
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
          <Button color="primary">Đổi mật khẩu</Button>
        </Form>
      </Col>
      <Col md="4">.col-3</Col>
    </Row>
  );
};

export default ChangePasswordPage;
