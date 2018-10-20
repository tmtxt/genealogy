import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { wrapUserConsumer } from 'contexts';
import { navigateToHomePage } from 'libs/navigation';

const requireLoggedInUser = WrappedComponent => {
  class RequireLoggedInUser extends Component {
    componentDidMount() {
      const {
        userSelectors: { isLoggedIn }
      } = this.props;

      if (!isLoggedIn()) {
        navigateToHomePage(this.props.history);
      }
    }

    render() {
      const {
        userSelectors: { isLoggedIn }
      } = this.props;

      if (!isLoggedIn()) return <div />;

      return <WrappedComponent {...this.props} />;
    }
  }

  return withRouter(wrapUserConsumer(RequireLoggedInUser));
};

export default requireLoggedInUser;
