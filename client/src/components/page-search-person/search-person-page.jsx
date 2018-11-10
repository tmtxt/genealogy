// @flow
import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { connect } from 'react-redux';

import { findPersonByName } from 'store/actions/person';

type Props = {
  findPersonByName: typeof findPersonByName
};

class SearchPersonPage extends Component<Props> {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label>Tên</Label>
          <Input type="text" placeholder="Tên" />
        </FormGroup>
        <Button color="primary">Tìm kiếm</Button>
      </Form>
    );
  }
}



export default connect(
  null,
  { findPersonByName }
)(SearchPersonPage);
