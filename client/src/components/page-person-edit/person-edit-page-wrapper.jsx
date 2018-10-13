// @flow
import React, { Component } from 'react';
import { navigateToPersonDetailPage } from 'libs/navigation';

import { wrapPersonConsumer } from 'contexts';

import PersonEditPage from './person-edit-page';

const getPersonFromProps = props => {
  const {
    match: {
      params: { personId }
    },
    personSelectors: { selectPersonById }
  } = props;

  return selectPersonById(personId);
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

  // componentDidUpdate(prevProps) {
  //   const currentPerson = getPersonFromProps(this.props);
  //   const prevPerson = getPersonFromProps(prevProps);

  //   const currentUpdating = currentPerson && currentPerson.get('isUpdating');
  //   const prevUpdating = prevPerson && prevPerson.get('isUpdating');

  //   if (prevUpdating && !currentUpdating) {
  //     const {
  //       match: {
  //         params: { personId }
  //       },
  //       history
  //     } = this.props;
  //     navigateToPersonDetailPage(history, personId);
  //   }
  // }

  render() {
    const { person } = this.state;

    return <PersonEditPage {...{ person }} />;
  }
}

export default wrapPersonConsumer(PersonEditPageWrapper);
