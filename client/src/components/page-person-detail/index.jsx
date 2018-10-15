import React, { Component } from 'react';
import { flowRight } from 'lodash';

import { withPersonDataFromParam } from 'components/person';
import { wrapPersonConsumer } from 'contexts';
import { navigateToPersonEditPage, navigateToAddChildPage } from 'libs/navigation';

import PersonDetailPage from './person-detail-page';

class PersonDetailPageWrapper extends Component {
  state = {
    showAddChildErrorDialog: false
  };

  componentDidUpdate(prevProps) {
    const { personMeta: prevMeta } = prevProps;
    const { history, personMeta: currentMeta } = this.props;

    if (prevMeta.get('isAddingMarriage') && !currentMeta.get('isAddingMarriage')) {
      navigateToPersonEditPage(history, currentMeta.get('marriagePersonId'));
      return;
    }
  }

  toggleAddChildDialog = () =>
    this.setState({ showAddChildErrorDialog: !this.state.showAddChildErrorDialog });

  addChild = () => {
    const { personId } = this.props;
    navigateToAddChildPage(this.props.history, personId);
  };

  render() {
    const { personId, person, personMeta } = this.props;
    const {
      personActions: { addMarriage }
    } = this.props;
    const { toggleAddChildDialog, addChild } = this;
    const { showAddChildErrorDialog } = this.state;

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

const enhance = flowRight([wrapPersonConsumer, withPersonDataFromParam]);
export default enhance(PersonDetailPageWrapper);
