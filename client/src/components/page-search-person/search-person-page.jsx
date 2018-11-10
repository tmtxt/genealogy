// @flow
import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { connect } from 'react-redux';

import { findPersonByName } from 'store/actions/person';

type Props = {
  findPersonByName: typeof findPersonByName
};
type State = {
  searchKey: string
};

class SearchPersonPage extends Component<Props, State> {
  state = { searchKey: '' };

  handleSearchKeyChange = e => this.setState({ searchKey: e.target.value });
  handleSubmit = () => this.props.findPersonByName(this.state.searchKey);

  render() {
    return (
      <Form>
        <FormGroup>
          <Label>Tên</Label>
          <Input
            type="text"
            placeholder="Tên"
            value={this.state.searchKey}
            onChange={this.handleSearchKeyChange}
          />
        </FormGroup>
        <Button onClick={this.handleSubmit} color="primary">
          Tìm kiếm
        </Button>
      </Form>
    );
  }
}

export default connect(
  null,
  { findPersonByName }
)(SearchPersonPage);
