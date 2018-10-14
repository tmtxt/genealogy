// @flow
import React, { Component } from 'react';

import AddChildPage from './add-child-page';

export class AddChildPageWrapper extends Component {
  static displayName = 'AddChildPageWrapper';

  render() {
    return <AddChildPage />;
  }
}

export default AddChildPageWrapper;
