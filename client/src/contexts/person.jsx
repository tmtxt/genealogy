import React, { Component } from 'react';
import { fromJS, Map as ImmutableMap } from 'immutable';
import { requestToApi } from 'react-data-fetching';
import UrlPattern from 'url-pattern';

const defaultMalePicture = require('images/male-default.svg');
const defaultFemalePicture = require('images/female-default.svg');

const { Provider, Consumer } = React.createContext();

// generic url pattern for interacting with 1 person
const personUrl = new UrlPattern('/api/persons/:personId');
const addWifeUrl = new UrlPattern('/api/persons/:personId/add-wife');
const addHusbandUrl = new UrlPattern('/api/persons/:personId/add-husband');

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
        personMap: {},

        // store person meta data by person id
        personMeta: {}
      }),

      // actions
      personActions: {
        fetchPersonData: this.fetchPersonData,
        updatePersonViaApi: this.updatePersonViaApi,
        addMarriage: this.addMarriage
      },

      // selectors
      personSelectors: {
        selectPersonById: this.selectPersonById,
        selectPersonMetaById: this.selectPersonMetaById
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
   * Set person meta data to the store
   * @param {int} personId
   * @param {Map} metaData
   */
  setPersonMeta = (personId, metaData) => {
    const { personStore } = this.state;
    this.setState({ personStore: personStore.setIn(['personMeta', personId], metaData) });
  };

  /**
   * Select the person data by id
   * @param {int} personId
   * @param {ImmutableMap?} personStore optionally specify the person store, otherwise, select the current from state
   * @return {Map} personData
   */
  selectPersonById = (personId, personStore) => {
    personStore = personStore || this.state.personStore;
    return personStore.getIn(['personMap', personId]);
  };

  /**
   * Select the person meta data data by person id
   * @param {int} personId
   * @param {ImmutableMap?} personStore optionally specify the person store, otherwise, select the current from state
   * @return {Map} {isUpdating: boolean}
   */
  selectPersonMetaById = (personId, personStore) => {
    personStore = personStore || this.state.personStore;
    return personStore.getIn(['personMeta', personId], new ImmutableMap());
  };

  /**
   * Fetch the person data from server and set to the store
   * @param {int} personId
   * @return {Map} personData
   */
  fetchPersonData = async personId => {
    const person = this.selectPersonById(personId);
    if (person) return;

    const res = await requestToApi({ url: personUrl.stringify({ personId }), method: 'GET' });
    if (!res.isOK) return;

    this.setPersonData(personId, transformGetPersonRes(res.data));
  };

  /**
   * Update the person via the api and set the new person data into the store
   * @param {int} personId
   * @param {ImmutableMap} personData
   */
  updatePersonViaApi = async (personId, personData) => {
    let personMeta = this.selectPersonMetaById(personId);
    this.setPersonMeta(personId, personMeta.set('isUpdating', true));

    const res = await requestToApi({
      url: personUrl.stringify({ personId }),
      method: 'PATCH',
      body: personData.toJS()
    });
    if (!res.isOK) return;

    personMeta = this.selectPersonMetaById(personId);
    this.setPersonData(personId, transformGetPersonRes(res.data));
    this.setPersonMeta(personId, personMeta.set('isUpdating', false));
  };

  /**
   * Add a new marriage (wife/husband) for the current person via api
   * @param {int} personId
   */
  addMarriage = async personId => {
    let personMeta = this.selectPersonMetaById(personId);
    this.setPersonMeta(
      personId,
      personMeta.set('isAddingMarriage', true).set('marriagePersonId', null)
    );

    const person = this.selectPersonById(personId);
    const gender = person.get('gender');
    const pattern = gender === 'male' ? addWifeUrl : addHusbandUrl;
    const res = await requestToApi({
      url: pattern.stringify({ personId }),
      method: 'POST'
    });
    if (!res.isOK) return;

    personMeta = this.selectPersonMetaById(personId);
    this.setPersonMeta(
      personId,
      personMeta.set('isAddingMarriage', false).set('marriagePersonId', res.data.id)
    );
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
