import React, { Component } from 'react';
import { flowRight } from 'lodash';

import { wrapMainLayout } from 'components/layouts';
import { withPersonDataFetching } from 'components/person';

class PersonDetailPage extends Component {
  render() {
    return <div>Hello</div>;
  }
}

const hoc = flowRight([wrapMainLayout, withPersonDataFetching]);
export default hoc(PersonDetailPage);
