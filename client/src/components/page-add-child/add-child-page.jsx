// @flow
import React from 'react';
import { Form, Button, Label, Input, FormGroup } from 'reactstrap';

import { wrapMainLayout } from 'components/layouts';
import { Loader } from 'components/shared';

export const AddChildPage = ({
  person,
  personMeta,
  selectedMarriageId,
  handleMarriageIdChanged,
  handleAddChild
}) => {
  if (!person) {
    return <Loader />;
  }

  const marriages = person.get('marriages');
  const gender = person.get('gender');
  const listText = gender === 'male' ? 'Vợ' : 'Chồng';

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">Thêm con cho {person.get('name')} và</div>
        <div className="col-md-6">
          <Form>
            <FormGroup>
              <Label>{listText}</Label>
              <Input
                type="select"
                value={selectedMarriageId}
                onChange={e => handleMarriageIdChanged(e.target.value)}
              >
                {marriages.map((marriage, idx) => (
                  <option key={idx} value={marriage.get('id')}>
                    {marriage.get('name') || 'Không rõ'}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <Button onClick={handleAddChild} color="primary">
              Thêm
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default wrapMainLayout(AddChildPage);
