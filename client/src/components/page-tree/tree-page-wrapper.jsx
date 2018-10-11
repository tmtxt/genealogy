import React, { Component } from 'react';

import TreePage from './tree-page';

export class TreePageWrapper extends Component {
  static displayName = 'TreePageWrapper';

  render() {
    return <TreePage />;
  }
}

export default TreePageWrapper;
