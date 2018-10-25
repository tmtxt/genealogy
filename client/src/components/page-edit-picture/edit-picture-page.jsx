import React from 'react';
import { Button, Col, Form, FormGroup, FormText, Input, Label, Row } from 'reactstrap';

import { Loader } from 'components/shared';

const EditPicturePage = ({ isUpdating, handleFileUpdate, handleSubmit }) => (
  <Row>
    <Col md={4} />
    <Col md={4}>
      <Form>
        <FormGroup>
          <Label>Chọn ảnh</Label>
          <Input
            disabled={isUpdating}
            type="file"
            onChange={e => handleFileUpdate(e.target.files[0])}
          />
          <FormText color="muted">Chọn file ảnh JPG hoặc PNG</FormText>
        </FormGroup>
        <Button disabled={isUpdating} color="primary" onClick={handleSubmit}>
          Tải lên
        </Button>
        {isUpdating && <Loader />}
      </Form>
    </Col>
    <Col md={4} />
  </Row>
);

export default EditPicturePage;
