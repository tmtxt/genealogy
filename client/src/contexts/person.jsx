import React, { Component } from 'react';
import { Map } from 'immutable';

const { Provider, Consumer } = React.createContext();

class PersonProviderWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // data
      personMap: Map(),

      // actions
      setPersonData: this.setPersonData,
      selectPersonById: this.selectPersonById
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
    const { personMap } = this.state;
    this.setState({ personMap: personMap.set(personId, personData) });
  };

  selectPersonById = personId => {
    const { personMap } = this.state;
    return personMap.get(personId);
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
