import React, { Component } from 'react';
import { navigateToPersonDetailPage } from 'libs/navigation';

import { wrapPersonConsumer } from 'contexts';
import { requireLoggedInUser } from 'components/user';

import PersonEditPage from './person-edit-page';

const getPersonFromProps = props => {
  const {
    match: {
      params: { personId }
    },
    personStore,
    personSelectors: { selectPersonById }
  } = props;

  return selectPersonById(personId, personStore);
};

const getPersonMetaFromProps = props => {
  const {
    match: {
      params: { personId }
    },
    personStore,
    personSelectors: { selectPersonMetaById }
  } = props;

  return selectPersonMetaById(personId, personStore);
};

class PersonEditPageWrapper extends Component {
  static displayName = 'PersonEditPageWrapper';

  static getDerivedStateFromProps(nextProps, prevState) {
    const person = getPersonFromProps(nextProps);
    if (person && !prevState.person) {
      return { person };
    }

    return null;
  }

  state = {
    person: null
  };

  componentDidMount() {
    const person = getPersonFromProps(this.props);
    if (person) {
      this.setState({ person });
    } else {
      const {
        match: {
          params: { personId }
        }
      } = this.props;
      this.props.personActions.fetchPersonData(personId);
    }
  }

  componentDidUpdate(prevProps) {
    const currentMeta = getPersonMetaFromProps(this.props);
    const prevMeta = getPersonMetaFromProps(prevProps);

    const currentUpdating = currentMeta && currentMeta.get('isUpdating');
    const prevUpdating = prevMeta && prevMeta.get('isUpdating');

    if (prevUpdating && !currentUpdating) {
      const {
        match: {
          params: { personId }
        },
        history
      } = this.props;
      navigateToPersonDetailPage(history, personId);
    }
  }

  updatePerson = (key, val) => this.setState({ person: this.state.person.set(key, val) });

  render() {
    const { person } = this.state;

    const {
      match: {
        params: { personId }
      },
      personSelectors: { selectPersonMetaById },
      personActions: { updatePersonViaApi }
    } = this.props;
    const { updatePerson } = this;

    const personMeta = selectPersonMetaById(personId);
    const isUpdating = personMeta.get('isUpdating');

    return (
      <PersonEditPage {...{ personId, person, updatePersonViaApi, isUpdating, updatePerson }} />
    );
  }
}

export default requireLoggedInUser(wrapPersonConsumer(PersonEditPageWrapper));
