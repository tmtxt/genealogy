// @flow
import React from 'react';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';

import { wrapMainLayout } from 'components/layouts';
import { Loader } from 'components/shared';

export const PersonEditPage = ({ person }) => {
  if (!person) {
    return (
      <div className="center-block">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Form>
            <FormGroup>
              <Label for="name">Tên</Label>
              <Input type="text" placeholder="Họ và Tên" value={person.get('name')} />
            </FormGroup>
            <FormGroup>
              <Label for="name">Nghề nghiệp</Label>
              <Input type="text" placeholder="Nghề nghiệp chính" value={person.get('job')} />
            </FormGroup>
            <FormGroup>
              <Label for="name">Thông tin thêm</Label>
              <Input type="textarea" plaintext={person.get('summary')} />
            </FormGroup>
            <Button>Lưu</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default wrapMainLayout(PersonEditPage);
