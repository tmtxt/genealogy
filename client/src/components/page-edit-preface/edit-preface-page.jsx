import React from 'react';
import _ from 'lodash';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Loader from '../shared/loader';

export const EditPrefacePage = ({ preface, onPrefacedChanged }) => {
  if (_.isNil(preface)) {
    return <Loader />;
  }

  return (
    <Form>
      <FormGroup>
        <Label for="exampleText">Lời nói đầu</Label>
        <Input type="textarea" value={preface} onChange={e => onPrefacedChanged(e.target.value)} />
      </FormGroup>
      <Button>Cập nhật</Button>
    </Form>
  );
};

export default EditPrefacePage;
