import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setPersonsRelation } from 'store/actions/persons-relation';
import PersonsRelationPage from './persons-relation-page';

class PersonsRelationPageWrapper extends Component {
  componentDidMount() {
    this.props.setPersonsRelation();
  }

  render() {
    return <PersonsRelationPage />;
  }
}

export default connect(
  null,
  { setPersonsRelation }
)(PersonsRelationPageWrapper);
