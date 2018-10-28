import React, { Component } from 'react';
import { fromJS, Map as ImmutableMap } from 'immutable';

import { wrapApiConsumer } from './api';

const { Provider, Consumer } = React.createContext();

class ChildrenOrderProviderWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // data
      childrenOrderStore: ImmutableMap(),

      // actions
      childrenOrderActions: {
        fetchChildrenWithOrder: this.fetchChildrenWithOrder,
        updateChildrenOrder: this.updateChildrenOrder
      },

      // selectors
      childrenOrderSelectors: {
        selectChildrenInfo: this.selectChildrenInfo
      }
    };
  }

  setChildrenDetail = (personId, data) => {
    const { childrenOrderStore } = this.state;
    this.setState({ childrenOrderStore: childrenOrderStore.set(personId, data) });
  };

  selectChildrenInfo = parentPersonId => {
    return this.state.childrenOrderStore.get(parentPersonId);
  };

  updateChildrenOrder = async (parentPersonId, childrenOrderList) => {
    let childrenDetail = this.selectChildrenInfo(parentPersonId);
    this.setChildrenDetail(parentPersonId, childrenDetail.set('isUpdating', true));

    await this.props.sendApiRequest(
      'person.updateChildrenOrder',
      { personId: parentPersonId },
      null,
      { childrenOrderList }
    );

    childrenDetail = this.selectChildrenInfo(parentPersonId);
    this.setChildrenDetail(parentPersonId, childrenDetail.set('isUpdating', false));
  };

  /**
   * Fetch children with order from server
   * @param {int} parentPersonId
   * @returns {Promise<void>}
   */
  fetchChildrenWithOrder = async parentPersonId => {
    const res = await this.props.sendApiRequest('person.getChildrenWithOrder', {
      personId: parentPersonId
    });

    this.setChildrenDetail(parentPersonId, fromJS(res));
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
const EnhancedChildrenOrderProviderWrapper = wrapApiConsumer(ChildrenOrderProviderWrapper);

export const wrapChildrenOrderProvider = WrappedComponent => props => (
  <EnhancedChildrenOrderProviderWrapper>
    <WrappedComponent {...props} />
  </EnhancedChildrenOrderProviderWrapper>
);

export const wrapChildrenOrderConsumer = WrappedComponent => props => (
  <Consumer>{values => <WrappedComponent {...props} {...values} />}</Consumer>
);
