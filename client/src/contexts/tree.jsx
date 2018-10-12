import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { requestToApi } from 'react-data-fetching';
import UrlPattern from 'url-pattern';
import _ from 'lodash';

const { Provider, Consumer } = React.createContext();

const getTreeFromRootUrl = new UrlPattern('/api/root-person/tree');
const getTreeId = rootPersonId =>
  _.isNumber(rootPersonId)
    ? rootPersonId.toString()
    : _.isString(rootPersonId)
      ? rootPersonId
      : 'root';

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
        fetchTreeData: this.fetchTreeData,
        toggleChildren: this.toggleChildren
      },

      // selectors
      treeSelectors: {
        selectTreeDataById: this.selectTreeDataById
      }
    };
  }

  selectTreeDataById = rootPersonId => {
    const treeId = getTreeId(rootPersonId);
    return this.state.treeStore.getIn(['treeMap', treeId]);
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
      const children = node.get('children').map(childNode => {
        return childNode.get('id') === childId ? updateNode(childNode, _.tail(path)) : childNode;
      });
      return node.set('children', children);
    };

    let treeData = this.selectTreeDataById(rootPersonId);
    treeData = updateNode(treeData, path);
    this.setTreeDataById(rootPersonId, treeData);
  };

  /**
   * Set the tree data to the treeMap for this rootPersonId
   *
   * @param {int} rootPersonId
   *
   * @param {Map} treeData
   *
   */
  setTreeDataById = (rootPersonId, treeData) => {
    const treeId = getTreeId(rootPersonId);
    let { treeStore } = this.state;
    treeStore = treeStore.setIn(['treeMap', treeId], treeData);
    this.setState({ treeStore });
  };

  /**
   * Trigger api call to get the tree data and set to the store
   *
   * @param {int} rootPersonId optionally, omit to from root
   *
   */
  fetchTreeData = async rootPersonId => {
    const treeId = getTreeId(rootPersonId);

    let res;
    if (!rootPersonId) {
      res = await requestToApi({ url: getTreeFromRootUrl.stringify(), method: 'GET' });
    } else {
      // TODO call api to get from a specific person id
    }

    if (!res.isOK) return;
    this.setTreeDataById(treeId, fromJS(res.data));
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
