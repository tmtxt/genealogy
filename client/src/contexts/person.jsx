import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { requestToApi } from 'react-data-fetching';

const { Provider, Consumer } = React.createContext();

class PersonProviderWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // data
      personStore: fromJS({
        // store person by id
        personMap: {}
      }),

      // actions
      personActions: {
        selectPersonById: this.selectPersonById,
        fetchPersonData: this.fetchPersonData
      }
    };
  }

  /**
   * Set person data to the personMap
   * @param {int} personId
   * @param {Map} personData
   */
  setPersonData = (personId, personData) => {
    const { personStore } = this.state;
    this.setState({ personStore: personStore.setIn(['personMap', personId], personData) });
  };

  /**
   * Select the person data by id
   * @param {int} personId
   * @return {Map} personData
   */
  selectPersonById = personId => {
    const { personStore } = this.state;
    return personStore.getIn(['personMap', personId]);
  };

  /**
   * Fetch the person data from server and set to the store
   * @param {int} personId
   * @return {Map} personData
   */
  fetchPersonData = async personId => {
    const person = this.selectPersonById(personId);
    if (person) return;

    const res = await requestToApi({ url: '/api/persons/73', method: 'GET' });
    if (!res.isOK) return;

    this.setPersonData(personId, fromJS(res.data));
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
