// @flow
import React from 'react';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';

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
              <Label>Giới tính</Label>
              <Input
                type="select"
                value={person.get('gender') || 'male'}
                onChange={e => updatePerson('gender', e.target.value)}
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Ngày sinh</Label>
              <Input
                type="date"
                value={person.get('birthDate') || ''}
                disabled={isUpdating}
                onChange={e => updatePerson('birthDate', e.target.value)}
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  checked={!!person.get('isDead')}
                  type="checkbox"
                  onChange={e => updatePerson('isDead', e.target.checked)}
                />{' '}
                Đã mất?
              </Label>
            </FormGroup>
            {person.get('isDead') && (
              <FormGroup>
                <Label>Ngày mất</Label>
                <Input
                  type="date"
                  value={person.get('deathDate') || ''}
                  disabled={isUpdating}
                  onChange={e => updatePerson('deathDate', e.target.value)}
                />
              </FormGroup>
            )}
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
            <Button
              color="primary"
              onClick={() => updatePersonViaApi(personId, person)}
              disabled={isUpdating}
            >
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
