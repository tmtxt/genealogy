import React, { Component } from 'react';
import { get } from 'lodash';

import { wrapTreeConsumer } from 'contexts';

import TreePage from './tree-page';

export class TreePageWrapper extends Component {
  static displayName = 'TreePageWrapper';

  state = {
    marriagesEnabled: false
  };

  componentDidMount() {
    const rootPersonId = get(this.props, ['match', 'params', 'personId'], null);
    this.props.treeActions.fetchTreeData(rootPersonId);
  }

  handleMarriagesToggle = enabled => this.setState({ marriagesEnabled: !!enabled });

  render() {
    const rootPersonId = get(this.props, ['match', 'params', 'personId'], null);
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
