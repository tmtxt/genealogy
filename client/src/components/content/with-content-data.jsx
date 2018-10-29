import React, { Component } from 'react';

import { wrapContentConsumer } from 'contexts';
import { Loader } from '../shared';

const withContentData = contentKey => WrappedComponent => {
  class WithContentData extends Component {
    componentDidMount() {
      this.props.contentActions.fetchContentValue(contentKey);
    }

    render() {
      const contentValue = this.props.contentStore.get(contentKey);

      if (!contentValue) {
        return <Loader />;
      }

      return <WrappedComponent {...this.props} {...{ contentKey, contentValue }} />;
    }
  }

  return wrapContentConsumer(WithContentData);
};

export default withContentData;
