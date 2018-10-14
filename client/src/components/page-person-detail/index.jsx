import React, { Component } from 'react';

import { wrapPersonConsumer } from 'contexts';
import { navigateToPersonEditPage } from 'libs/navigation';

import PersonDetailPage from './person-detail-page';

const getPersonIdFromProps = props => props.match.params.personId;

const selectPersonMetaFromProps = props => {
  const {
    match: {
      params: { personId }
    },
    personStore,
    personSelectors: { selectPersonMetaById }
  } = props;

  return selectPersonMetaById(personId, personStore);
};

class PersonDetailPageWrapper extends Component {
  state = {
    showAddChildErrorDialog: false
  };

  componentDidMount() {
    const personId = getPersonIdFromProps(this.props);
    this.props.personActions.fetchPersonDataWithRelations(personId, true);
  }

  componentDidUpdate(prevProps) {
    const { history } = this.props;
    const prevMeta = selectPersonMetaFromProps(prevProps);
    const currentMeta = selectPersonMetaFromProps(this.props);

    if (prevMeta.get('isAddingMarriage') && !currentMeta.get('isAddingMarriage')) {
      navigateToPersonEditPage(history, currentMeta.get('marriagePersonId'));
      return;
    }

    const prevPersonId = getPersonIdFromProps(prevProps);
    const currentPersonId = getPersonIdFromProps(this.props);
    if (prevPersonId !== currentPersonId) {
      this.props.personActions.fetchPersonDataWithRelations(currentPersonId, true);
      return;
    }
  }

  toggleAddChildDialog = () =>
    this.setState({ showAddChildErrorDialog: !this.state.showAddChildErrorDialog });

  addChild = () => {
    this.toggleAddChildDialog();
  };

  render() {
    const {
      match: {
        params: { personId }
      },
      personSelectors: { selectPersonById, selectPersonMetaById },
      personActions: { addMarriage }
    } = this.props;
    const { toggleAddChildDialog, addChild } = this;
    const { showAddChildErrorDialog } = this.state;

    const person = selectPersonById(personId);
    const personMeta = selectPersonMetaById(personId);

    const isAddingMarriage = personMeta.get('isAddingMarriage');

    return (
      <PersonDetailPage
        {...{
          personId,
          person,
          addMarriage,
          isAddingMarriage,
          toggleAddChildDialog,
          showAddChildErrorDialog,
          addChild
        }}
      />
    );
  }
}

export default wrapPersonConsumer(PersonDetailPageWrapper);
