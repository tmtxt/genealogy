// @flow
import React from 'react';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';

import { wrapMainLayout } from 'components/layouts';
import { Loader } from 'components/shared';

export const PersonEditPage = ({ personId, person, updatePersonViaApi, isUpdating }) => {
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
              <Input
                type="text"
                placeholder="Họ và Tên"
                value={person.get('name')}
                disabled={isUpdating}
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Nghề nghiệp</Label>
              <Input
                type="text"
                placeholder="Nghề nghiệp chính"
                value={person.get('job')}
                disabled={isUpdating}
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Thông tin thêm</Label>
              <Input type="textarea" plaintext={person.get('summary')} disabled={isUpdating} />
            </FormGroup>
            <Button onClick={() => updatePersonViaApi(personId, person)} disabled={isUpdating}>
              Lưu
            </Button>
            {isUpdating && <Loader />}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default wrapMainLayout(PersonEditPage);
