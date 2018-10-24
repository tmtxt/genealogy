import React, { Component } from 'react';
import { requestToApi } from 'react-data-fetching';
import { Button, Col, Form, FormGroup, FormText, Input, Label, Row } from 'reactstrap';

const upload = async file => {
  const form = new FormData();
  form.append('pic', file);
  //
  // const res = await requestToApi({
  //   url: '/api/persons/abc/picture',
  //   headers: {
  //     'Content-Type': undefined
  //   },
  //   method: 'FORM_DATA',
  //   // body: {
  //   //   pic: file
  //   // }
  //   body: {
  //     pic: file
  //   }
  // });

  const res = await fetch('/api/persons/0/picture', {
    method: 'POST',
    body: form
  });

  console.log(res);
};

class EditPicturePage extends Component {
  handleChange = e => {
    console.log(e.target.files[0]);
    upload(e.target.files[0]);
  };

  render() {
    return (
      <Row>
        <Col md={4} />
        <Col md={4}>
          <Form>
            <FormGroup>
              <Label>Chọn ảnh</Label>
              <Input type="file" />
              <FormText color="muted">Chọn file ảnh JPG hoặc PNG</FormText>
            </FormGroup>
            <Button color="primary">Tải lên</Button>
          </Form>
        </Col>
        <Col md={4} />
      </Row>
    );
  }
}

export default EditPicturePage;
