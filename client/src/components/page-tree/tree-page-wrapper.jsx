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
    const { toggleChildren } = this.props.treeActions;

    return <TreePage {...{ treeData, toggleChildren }} />;
  }
}

export default wrapTreeConsumer(TreePageWrapper);
