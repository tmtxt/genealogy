import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { requestToApi } from 'react-data-fetching';
import UrlPattern from 'url-pattern';
import _ from 'lodash';

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
        getTreeFromRoot: this.getTreeFromRoot,
        toggleChildren: this.toggleChildren
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

  toggleChildren = (rootPersonId, path) => {
    const updateNode = (node, path) => {
      // base case
      if (!path.length) {
        const children = node.get('children');
        const _children = node.get('_children');
        return node.set('children', _children).set('_children', children);
      }

      // recursive case
      const childId = _.head(path);
      console.log(childId);
      const children = node.get('children').map(childNode => {
        return childNode.get('id') === childId ? updateNode(childNode, _.tail(path)) : childNode;
      });
      return node.set('children', children);
    };

    let treeData = this.selectRootTreeData();
    treeData = updateNode(treeData, path);
    this.setTreeByRootId('root', treeData);
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
