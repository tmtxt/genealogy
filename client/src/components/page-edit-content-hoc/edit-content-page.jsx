import React from 'react';
import _ from 'lodash';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Loader from '../shared/loader';

export const EditContentPage = ({ content, contentTitle, onContentChanged, onSubmit }) => {
  if (_.isNil(content)) {
    return <Loader />;
  }

  return (
    <Form>
      <FormGroup>
        <Label>{contentTitle}</Label>
        <Input rows={10} type="textarea" value={content} onChange={e => onContentChanged(e.target.value)} />
      </FormGroup>
      <Button onClick={onSubmit}>Cập nhật</Button>
    </Form>
  );
};

export default EditContentPage;
