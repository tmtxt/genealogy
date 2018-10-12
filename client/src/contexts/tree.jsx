import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { requestToApi } from 'react-data-fetching';
import UrlPattern from 'url-pattern';

const { Provider, Consumer } = React.createContext();

const getTreeFromRootUrl = new UrlPattern('/api/root-person/tree');

class TreeProviderWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // data
      treeStore: fromJS({
        // store tree by root person id
        treeMap: {}
      }),

      // actions
      treeActions: {
        getTreeFromRoot: this.getTreeFromRoot
      },

      // selectors
      treeSelectors: {
        selectRootTreeData: this.selectRootTreeData
      }
    };
  }

  selectRootTreeData = () => {
    return this.state.treeStore.getIn(['treeMap', 'root']);
  };

  /**
   * Set the tree data to the treeMap for this rootPersonId
   *
   * @param {int} rootPersonId
   *
   * @param {Map} treeData
   *
   */
  setTreeByRootId = (rootPersonId, treeData) => {
    let { treeStore } = this.state;
    treeStore = treeStore.setIn(['treeMap', rootPersonId], treeData);
    this.setState({ treeStore });
  };

  // trigger api call to get the tree data from root person
  getTreeFromRoot = async () => {
    const res = await requestToApi({ url: getTreeFromRootUrl.stringify(), method: 'GET' });
    if (!res.isOK) return;
    this.setTreeByRootId('root', fromJS(res.data));
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export const wrapTreeProvider = WrappedComponent => props => (
  <TreeProviderWrapper>
    <WrappedComponent {...props} />
  </TreeProviderWrapper>
);

export const wrapTreeConsumer = WrappedComponent => props => (
  <Consumer>{values => <WrappedComponent {...props} {...values} />}</Consumer>
);
