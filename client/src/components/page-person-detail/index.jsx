import React, { Component } from 'react';
import { flowRight } from 'lodash';

import { withPersonDataFromParam } from 'components/person';
import { wrapPersonConsumer } from 'contexts';
import { navigateToPersonEditPage } from 'libs/navigation';

import PersonDetailPage from './person-detail-page';

class PersonDetailPageWrapper extends Component {
  componentDidUpdate(prevProps) {
    const { personMeta: prevMeta } = prevProps;
    const { history, personMeta: currentMeta } = this.props;

    if (prevMeta.get('isAddingMarriage') && !currentMeta.get('isAddingMarriage')) {
      navigateToPersonEditPage(history, currentMeta.get('marriagePersonId'));
      return;
    }
  }

  render() {
    const { personId, person, personMeta } = this.props;
    const {
      personActions: { addMarriage }
    } = this.props;

    const isAddingMarriage = personMeta.get('isAddingMarriage');

    return (
      <PersonDetailPage
        {...{
          personId,
          person,
          personMeta,
          addMarriage,
          isAddingMarriage
        }}
      />
    );
  }
}

const enhance = flowRight([wrapPersonConsumer, withPersonDataFromParam]);
export default enhance(PersonDetailPageWrapper);
