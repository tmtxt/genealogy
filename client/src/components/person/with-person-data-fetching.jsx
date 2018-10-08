import React, { Component } from 'react';
import { Fetch } from 'react-data-fetching';
import { fromJS } from 'immutable';

import { wrapPersonConsumer } from 'contexts';

// Wrap the WrappedComponent with person data
// WrappedComponent must have personId prop
// WrappedComponent will be injected a new prop person
export const withPersonDataFetching = WrappedComponent => {
  class WithPersonDataFetching extends Component {
    handleDataFetched = res => {
      const { personId } = this.props;
      if (res.isOK) {
        this.props.personActions.setPersonData(personId, fromJS(res.data));
      }
    };

    render() {
      const { handleDataFetched: onFetch } = this;
      const {
        personId,
        personActions: { selectPersonById }
      } = this.props;
      const url = `/api/persons/${personId}`;
      const person = selectPersonById(personId);
      const refetchKey = personId;

      return (
        <Fetch {...{ url, onFetch, refetchKey }}>
          {() => <WrappedComponent {...this.props} {...{ person }} />}
        </Fetch>
      );
    }
  }

  return wrapPersonConsumer(WithPersonDataFetching);
};

export default withPersonDataFetching;
