import React, { Component } from 'react';

import { wrapPersonConsumer } from 'contexts';

const getPersonIdFromProps = props => props.match.params.personId;

// Auto fetch person data from server for the WrappedComponent
// Requires that the WrappedComponent is a route component and the route contains
// 1 param :personId
// The WrappedComponent will be injected 3 extra props
// {
//   personId: string,
//   person?: ImmutableMap,
//   personMeta: ImmutableMap
// }
const withPersonDataFromParam = WrappedComponent => {
  class WithPersonDataFromParam extends Component {
    // fetch person data on mount
    componentDidMount() {
      const personId = getPersonIdFromProps(this.props);
      this.props.personActions.fetchPersonDataWithRelations(personId, true);
    }

    // reload person data when personId changed
    componentDidUpdate(prevProps) {
      const prevPersonId = getPersonIdFromProps(prevProps);
      const currentPersonId = getPersonIdFromProps(this.props);
      if (prevPersonId !== currentPersonId) {
        this.props.personActions.fetchPersonDataWithRelations(currentPersonId, true);
      }
    }

    render() {
      const personId = getPersonIdFromProps(this.props);
      const {
        personSelectors: { selectPersonById, selectPersonMetaById }
      } = this.props;

      const person = selectPersonById(personId);
      const personMeta = selectPersonMetaById(personId);

      return <WrappedComponent {...this.props} {...{ personId, person, personMeta }} />;
    }
  }

  return wrapPersonConsumer(WithPersonDataFromParam);
};

export default withPersonDataFromParam;
