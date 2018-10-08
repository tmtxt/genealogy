import React, { Component } from 'react';
import { flowRight } from 'lodash';

import { wrapMainLayout } from 'components/layouts';
import { withPersonDataFetching } from 'components/person';
import { Loader } from 'components/shared';

class PersonDetailPage extends Component {
  render() {
    const { person } = this.props;

    if (!person) {
      return <Loader />;
    }

    console.log('----------------------------------------------------------------------');
    console.log(person.toJS());
    console.log('----------------------------------------------------------------------');
    return <div>Hello</div>;
  }
}

const hoc = flowRight([wrapMainLayout, withPersonDataFetching]);
export default hoc(PersonDetailPage);
