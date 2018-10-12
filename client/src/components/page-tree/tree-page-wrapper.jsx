import React, { Component } from 'react';

import { wrapTreeConsumer } from 'contexts';

import TreePage from './tree-page';

export class TreePageWrapper extends Component {
  static displayName = 'TreePageWrapper';

  componentDidMount() {
    const rootPersonId = null;
    this.props.treeActions.fetchTreeData(rootPersonId);
  }

  render() {
    const rootPersonId = null;
    const treeData = this.props.treeSelectors.selectTreeDataById(rootPersonId);
    const { toggleChildren } = this.props.treeActions;

    return <TreePage {...{ treeData, toggleChildren, rootPersonId }} />;
  }
}

export default wrapTreeConsumer(TreePageWrapper);
