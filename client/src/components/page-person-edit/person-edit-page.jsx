// @flow
import React from 'react';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';

import { wrapMainLayout } from 'components/layouts';
import { Loader } from 'components/shared';

export const PersonEditPage = ({
  personId,
  person,
  updatePersonViaApi,
  isUpdating,
  updatePerson
}) => {
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
              <Label>Tên</Label>
              <Input
                type="text"
                placeholder="Họ và Tên"
                value={person.get('name') || ''}
                disabled={isUpdating}
                onChange={e => updatePerson('name', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Nghề nghiệp</Label>
              <Input
                type="text"
                placeholder="Nghề nghiệp chính"
                value={person.get('job') || ''}
                disabled={isUpdating}
                onChange={e => updatePerson('job', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Thông tin thêm</Label>
              <Input
                onChange={e => updatePerson('summary', e.target.value)}
                type="textarea"
                value={person.get('summary') || ''}
                disabled={isUpdating}
              />
            </FormGroup>
            <FormGroup>
              <Label>Tên</Label>
              <Input
                type="date"
                value={person.get('birthDate') || ''}
                disabled={isUpdating}
                onChange={e => updatePerson('birthDate', e.target.value)}
              />
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

export default PersonEditPage;
