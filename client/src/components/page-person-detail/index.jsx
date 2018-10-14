import React, { Component } from 'react';

import { wrapPersonConsumer } from 'contexts';

import PersonDetailPage from './person-detail-page';

class PersonDetailPageWrapper extends Component {
  componentDidMount() {
    const {
      match: {
        params: { personId }
      }
    } = this.props;
    this.props.personActions.fetchPersonData(personId);
  }

  render() {
    const {
      match: {
        params: { personId }
      },
      personSelectors: { selectPersonById, selectPersonMetaById },
      personActions: { addMarriage }
    } = this.props;

    const person = selectPersonById(personId);
    const personMeta = selectPersonMetaById(personId);

    const isAddingMarriage = personMeta.get('isAddingMarriage');

    return <PersonDetailPage {...{ personId, person, addMarriage, isAddingMarriage }} />;
  }
}

export default wrapPersonConsumer(PersonDetailPageWrapper);
