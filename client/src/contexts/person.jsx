import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { requestToApi } from 'react-data-fetching';
import UrlPattern from 'url-pattern';

const defaultMalePicture = require('images/male-default.svg');
const defaultFemalePicture = require('images/female-default.svg');

const { Provider, Consumer } = React.createContext();

const transformGetPersonRes = responseBody => {
  let person = fromJS(responseBody);

  const gender = person.get('gender', 'male');
  const picture = person.get('picture');

  if (!picture) {
    const picture = gender === 'male' ? defaultMalePicture : defaultFemalePicture;
    person = person.set('picture', picture);
  }

  return person;
};

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

    const pattern = new UrlPattern('/api/persons/:personId');
    const res = await requestToApi({ url: pattern.stringify({ personId }), method: 'GET' });
    if (!res.isOK) return;

    this.setPersonData(personId, transformGetPersonRes(res.data));
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
