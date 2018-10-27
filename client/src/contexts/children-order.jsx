import React, { Component } from 'react';
import { Map as ImmutableMap } from 'immutable';

import { wrapApiConsumer } from './api';

const { Provider, Consumer } = React.createContext();

class ChildrenOrderProviderWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // data
      childrenOrderStore: ImmutableMap(),

      // actions
      childrenOrderActions: {},

      // selectors
      childrenOrderSelectors: {}
    };
  }

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
