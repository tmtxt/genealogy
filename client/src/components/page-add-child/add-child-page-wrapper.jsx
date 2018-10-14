// @flow
import React, { Component } from 'react';

import { withPersonDataFromParam } from 'components/person';

import AddChildPage from './add-child-page';

export class AddChildPageWrapper extends Component {
  static displayName = 'AddChildPageWrapper';

  state = {
    marriageId: ''
  };

  componentDidUpdate(prevProps) {
    const { person: prevPerson } = prevProps;
    const { person: currentPerson } = this.props;

    if (!prevPerson && currentPerson) {
      const defaultMarriageId = currentPerson
        .get('marriages')
        .first()
        .get('id');
      this.setState({ marriageId: defaultMarriageId });
    }
  }

  handleMarriageIdChanged = marriageId => this.setState({ marriageId });

  handleAddChild = () => {
    console.log(this.state.marriageId);
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

export default withPersonDataFromParam(AddChildPageWrapper);
