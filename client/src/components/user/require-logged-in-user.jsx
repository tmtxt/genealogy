import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { wrapUserConsumer } from 'contexts';
import { Loader } from 'components/shared';

const requireLoggedInUser = WrappedComponent => {
  class RequireLoggedInUser extends Component {
    render() {
      const {
        userSelectors: { isLoggedIn, isInitializing }
      } = this.props;

      if (isInitializing()) {
        return <Loader />;
      }

      if (!isLoggedIn()) return <div />;

      return <WrappedComponent {...this.props} />;
    }
  }

  return withRouter(wrapUserConsumer(RequireLoggedInUser));
};

export default requireLoggedInUser;
