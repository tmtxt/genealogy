import React, { Component } from 'react';

import { wrapTreeConsumer } from 'contexts';

import TreePage from './tree-page';

export class TreePageWrapper extends Component {
  static displayName = 'TreePageWrapper';

  state = {
    marriagesEnabled: false
  };

  componentDidMount() {
    const rootPersonId = null;
    this.props.treeActions.fetchTreeData(rootPersonId);
  }

  handleMarriagesToggle = enabled => this.setState({ marriagesEnabled: !!enabled });

  render() {
    const rootPersonId = null;
    const treeData = this.props.treeSelectors.selectTreeDataById(rootPersonId);
    const { toggleChildren } = this.props.treeActions;
    const { marriagesEnabled } = this.state;

    return (
      <TreePage
        {...{ treeData, toggleChildren, rootPersonId, marriagesEnabled }}
        onMarriagesToggle={this.handleMarriagesToggle}
      />
    );
  }
}

export default wrapTreeConsumer(TreePageWrapper);
