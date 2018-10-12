import React, { Component } from 'react';

import { wrapTreeConsumer } from 'contexts';

import TreePage from './tree-page';

export class TreePageWrapper extends Component {
  static displayName = 'TreePageWrapper';

  componentDidMount() {
    this.props.treeActions.getTreeFromRoot();
  }

  render() {
    const treeData = this.props.treeSelectors.selectRootTreeData();

    return <TreePage {...{ treeData }} />;
  }
}

export default wrapTreeConsumer(TreePageWrapper);
