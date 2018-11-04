import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPersonsRelation } from 'store/actions/persons-relation';
import PersonsRelationPage from './persons-relation-page';

class PersonsRelationPageWrapper extends Component {
  componentDidMount() {
    this.props.fetchPersonsRelation(0, 24);
  }

  render() {
    return <PersonsRelationPage />;
  }
}

export default connect(
  null,
  { fetchPersonsRelation }
)(PersonsRelationPageWrapper);
