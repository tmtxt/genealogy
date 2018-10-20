import React, { Component } from 'react';
import { flowRight } from 'lodash';

import { withPersonDataFromParam } from 'components/person';
import { wrapPersonConsumer } from 'contexts';
import { requireLoggedInUser } from 'components/user';
import { navigateToPersonEditPage } from 'libs/navigation';

import AddChildPage from './add-child-page';

export class AddChildPageWrapper extends Component {
  static displayName = 'AddChildPageWrapper';

  state = {
    marriageId: ''
  };

  componentDidUpdate(prevProps) {
    const { person: prevPerson } = prevProps;
    const { person: currentPerson } = this.props;

    // initial state
    if (!prevPerson && currentPerson) {
      const defaultMarriageId = currentPerson
        .get('marriages')
        .first()
        .get('id');
      this.setState({ marriageId: defaultMarriageId });
      return;
    }

    // handle when finish adding child
    const { personMeta: prevMeta } = prevProps;
    const { personMeta: currentMeta } = this.props;
    if (prevMeta.get('isAddingChild') && !currentMeta.get('isAddingChild')) {
      navigateToPersonEditPage(this.props.history, currentMeta.get('childPersonId'));
      return;
    }
  }

  handleMarriageIdChanged = marriageId => this.setState({ marriageId });

  handleAddChild = () => {
    const { personId } = this.props;
    const { marriageId } = this.state;
    this.props.personActions.addChild(personId, marriageId);
  };

  render() {
    const { handleMarriageIdChanged, handleAddChild } = this;
    const { person, personMeta } = this.props;
    const { marriageId: selectedMarriageId } = this.state;

    return (
      <AddChildPage
        {...{ person, personMeta, selectedMarriageId, handleMarriageIdChanged, handleAddChild }}
      />
    );
  }
}

const enhance = flowRight([requireLoggedInUser, withPersonDataFromParam, wrapPersonConsumer]);
export default enhance(AddChildPageWrapper);
