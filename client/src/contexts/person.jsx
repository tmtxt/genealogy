import React, { Component } from 'react';
import { fromJS, Map as ImmutableMap, List as ImmutableList } from 'immutable';
import { requestToApi } from 'react-data-fetching';
import UrlPattern from 'url-pattern';

import PersonRecord from './records/person';

const { Provider, Consumer } = React.createContext();

// generic url pattern for interacting with 1 person
const personUrl = new UrlPattern('/api/persons/:personId');
const personWithRelationsUrl = new UrlPattern('/api/detailed-persons/:personId');
const addWifeUrl = new UrlPattern('/api/persons/:personId/add-wife');
const addHusbandUrl = new UrlPattern('/api/persons/:personId/add-husband');
const addChildUrl = new UrlPattern(
  '/api/persons/add-child/father/:fatherPersonId/mother/:motherPersonId'
);
const deletePersonUrl = new UrlPattern('/api/persons/:personId');

const transformGetPersonRes = responseBody => {
  let person = new PersonRecord(responseBody);

  if (person.get('father')) {
    person = person.set('father', new PersonRecord(person.get('father')));
  }
  if (person.get('mother')) {
    person = person.set('mother', new PersonRecord(person.get('mother')));
  }
  if (person.get('marriages')) {
    const marriages = person.get('marriages').map(marriage => new PersonRecord(marriage));
    person = person.set('marriages', ImmutableList(marriages));
  }
  if (person.get('children')) {
    const children = person.get('children').map(child => new PersonRecord(child));
    person = person.set('children', ImmutableList(children));
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
        fetchPersonDataWithRelations: this.fetchPersonDataWithRelations,
        updatePersonViaApi: this.updatePersonViaApi,
        addMarriage: this.addMarriage,
        addChild: this.addChild,
        deletePersonViaApi: this.deletePersonViaApi
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
  fetchPersonData = async (personId, forceReload) => {
    const person = this.selectPersonById(personId);
    if (person && !forceReload) return;

    const res = await requestToApi({ url: personUrl.stringify({ personId }), method: 'GET' });
    if (!res.isOK) return;

    this.setPersonData(personId, transformGetPersonRes(res.data));
  };

  /**
   * Fetch the person data with relations from server and set to the store
   * @param {int} personId
   * @return {Map} personData
   */
  fetchPersonDataWithRelations = async (personId, forceReload) => {
    const person = this.selectPersonById(personId);
    if (person && !forceReload) return;

    const res = await requestToApi({
      url: personWithRelationsUrl.stringify({ personId }),
      method: 'GET'
    });
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

  /**
   * Add a new child for this person
   * @param {int} personId
   * @param {int} marriagePersonId husband/wife id
   */
  addChild = async (personId, marriagePersonId) => {
    let personMeta = this.selectPersonMetaById(personId);
    this.setPersonMeta(personId, personMeta.set('isAddingChild', true).set('childPersonId', null));

    const person = this.selectPersonById(personId);
    const gender = person.get('gender');
    let fatherPersonId, motherPersonId;
    if (gender === 'male') {
      fatherPersonId = personId;
      motherPersonId = marriagePersonId;
    } else {
      motherPersonId = personId;
      fatherPersonId = marriagePersonId;
    }

    const res = await requestToApi({
      url: addChildUrl.stringify({ fatherPersonId, motherPersonId }),
      method: 'POST'
    });
    if (!res.isOK) return;

    personMeta = this.selectPersonMetaById(personId);
    this.setPersonMeta(
      personId,
      personMeta.set('isAddingChild', false).set('childPersonId', res.data.id)
    );
  };

  deletePersonViaApi = async personId => {
    let personMeta = this.selectPersonMetaById(personId);
    this.setPersonMeta(personId, personMeta.set('isDeleting', true));

    const res = await requestToApi({
      url: deletePersonUrl.stringify({ personId }),
      method: 'DELETE'
    });
    if (!res.isOK) return;

    personMeta = this.selectPersonMetaById(personId);
    this.setPersonMeta(personId, personMeta.set('isDeleting', false));
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
