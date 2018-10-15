import React, { Component } from 'react';
import { flowRight } from 'lodash';

import { withPersonDataFromParam } from 'components/person';
import { wrapPersonConsumer } from 'contexts';

import PersonDetailPage from './person-detail-page';

class PersonDetailPageWrapper extends Component {
  render() {
    const { personId, person, personMeta } = this.props;

    return (
      <PersonDetailPage
        {...{
          personId,
          person,
          personMeta
        }}
      />
    );
  }
}

const enhance = flowRight([wrapPersonConsumer, withPersonDataFromParam]);
export default enhance(PersonDetailPageWrapper);
