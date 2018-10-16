import React, { Component } from 'react';
import { fromJS, Map as ImmutableMap, List as ImmutableList } from 'immutable';
import { withAlert } from 'react-alert';

import PersonRecord from './records/person';
import { wrapApiConsumer } from './api';

const { Provider, Consumer } = React.createContext();

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

    const data = await this.props.sendApiRequest('person.getPersonById', { personId });
    this.setPersonData(personId, transformGetPersonRes(data));
  };

  /**
   * Fetch the person data with relations from server and set to the store
   * @param {int} personId
   * @return {Map} personData
   */
  fetchPersonDataWithRelations = async (personId, forceReload) => {
    const person = this.selectPersonById(personId);
    if (person && !forceReload) return;

    const data = await this.props.sendApiRequest('person.getPersonByIdWithRelations', { personId });
    this.setPersonData(personId, transformGetPersonRes(data));
  };

  /**
   * Update the person via the api and set the new person data into the store
   * @param {int} personId
   * @param {ImmutableMap} personData
   */
  updatePersonViaApi = async (personId, personData) => {
    let personMeta = this.selectPersonMetaById(personId);
    this.setPersonMeta(personId, personMeta.set('isUpdating', true));

    const patch = personData.toJS();
    const params = { personId };
    const data = await this.props.sendApiRequest('person.updatePersonById', params, null, patch);

    personMeta = this.selectPersonMetaById(personId);
    this.setPersonData(personId, transformGetPersonRes(data));
    this.setPersonMeta(personId, personMeta.set('isUpdating', false));
  };

  /**
   * Add a new marriage (wife/husband) for the current person via api
   * @param {int} personId
   */
  addMarriage = async personId => {
    let personMeta = this.selectPersonMetaById(personId);
    personMeta = personMeta.set('isAddingMarriage', true).set('marriagePersonId', null);
    this.setPersonMeta(personId, personMeta);

    const person = this.selectPersonById(personId);
    const gender = person.get('gender');
    const routeName = gender === 'male' ? 'person.addWife' : 'person.addHusband';
    const data = await this.props.sendApiRequest(routeName, { personId });

    personMeta = this.selectPersonMetaById(personId);
    personMeta = personMeta.set('isAddingMarriage', false).set('marriagePersonId', data.id);
    this.setPersonMeta(personId, personMeta);
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

    const params = { fatherPersonId, motherPersonId };
    const data = await this.props.sendApiRequest('person.addChild', params);

    personMeta = this.selectPersonMetaById(personId);
    personMeta = personMeta.set('isAddingChild', false).set('childPersonId', data.id);
    this.setPersonMeta(personId, personMeta);
  };

  deletePersonViaApi = async personId => {
    let personMeta = this.selectPersonMetaById(personId);
    this.setPersonMeta(personId, personMeta.set('isDeleting', true));

    await this.props.sendApiRequest('person.removePerson', { personId });
    this.props.alert.success('Đã xóa');

    personMeta = this.selectPersonMetaById(personId);
    this.setPersonMeta(personId, personMeta.set('isDeleting', false));
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
const EnhancedPersonProviderWrapper = withAlert(wrapApiConsumer(PersonProviderWrapper));

export const wrapPersonProvider = WrappedComponent => props => (
  <EnhancedPersonProviderWrapper>
    <WrappedComponent {...props} />
  </EnhancedPersonProviderWrapper>
);

export const wrapPersonConsumer = WrappedComponent => props => (
  <Consumer>{values => <WrappedComponent {...props} {...values} />}</Consumer>
);
