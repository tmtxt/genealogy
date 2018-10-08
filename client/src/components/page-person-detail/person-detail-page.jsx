import React, { Component } from 'react';

import { wrapMainLayout } from 'components/layouts';
import { Loader } from 'components/shared';

class PersonDetailPage extends Component {
  render() {
    const { person } = this.props;

    if (!person) {
      return (
        <div className="center-block">
          <Loader />
        </div>
      );
    }

    return <div>Hello</div>;
  }
}

export default wrapMainLayout(PersonDetailPage);
