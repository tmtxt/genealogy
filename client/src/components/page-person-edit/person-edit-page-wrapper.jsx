// @flow
import React, { Component } from 'react';

import PersonEditPage from './person-edit-page';

class PersonEditPageWrapper extends Component {
  static displayName = 'PersonEditPageWrapper';

  render() {
    return <PersonEditPage />;
  }
}

export default PersonEditPageWrapper;
