import React, { Component } from 'react';

import { wrapPersonConsumer } from 'contexts';
import { navigateToPersonEditPage } from 'libs/navigation';

const withAddMarriageHandler = WrappedComponent => {
  class WithAddMarriageHandler extends Component {
    componentDidUpdate(prevProps) {
      const { personMeta: prevMeta } = prevProps;
      const { history, personMeta: currentMeta } = this.props;

      if (prevMeta.get('isAddingMarriage') && !currentMeta.get('isAddingMarriage')) {
        navigateToPersonEditPage(history, currentMeta.get('marriagePersonId'));
        return;
      }
    }

    addMarriage = () => {
      const { personId } = this.props;
      this.props.personActions.addMarriage(personId);
    };

    render() {
      const { addMarriage } = this;
      const { personMeta } = this.props;
      const isAddingMarriage = !!personMeta.get('isAddingMarriage');

      return (
        <div>
          <WrappedComponent {...this.props} {...{ addMarriage, isAddingMarriage }} />
        </div>
      );
    }
  }

  return wrapPersonConsumer(WithAddMarriageHandler);
};

export default withAddMarriageHandler;
