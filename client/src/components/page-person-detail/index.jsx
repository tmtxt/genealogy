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
      personSelectors: { selectPersonById }
    } = this.props;

    const person = selectPersonById(personId);

    return <PersonDetailPage {...{ personId, person }} />;
  }
}

export default wrapPersonConsumer(PersonDetailPageWrapper);
