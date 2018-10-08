import React, { Component } from 'react';
import { fromJS } from 'immutable';

const { Provider, Consumer } = React.createContext();

class PersonProviderWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personStore: fromJS({
        personMap: {}
      }),

      // actions
      personActions: {
        setPersonData: this.setPersonData,
        selectPersonById: this.selectPersonById
      }
    };
  }

  /**
   * Set person data to the personMap
   *
   * @param {int} personId
   *
   * @param {Map} personData
   *
   */
  setPersonData = (personId, personData) => {
    const { personStore } = this.state;
    this.setState({ personStore: personStore.setIn(['personMap', personId], personData) });
  };

  selectPersonById = personId => {
    const { personStore } = this.state;
    return personStore.getIn(['personMap', personId]);
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export const wrapPersonProvider = WrappedComponent => props => (
  <PersonProviderWrapper>
    <WrappedComponent {...props} />
  </PersonProviderWrapper>
);

export const wrapPersonConsumer = WrappedComponent => props => (
  <Consumer>{values => <WrappedComponent {...props} {...values} />}</Consumer>
);
