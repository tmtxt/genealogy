import React, { Component } from 'react';
import { Map as ImmutableMap } from 'immutable';
import { withAlert } from 'react-alert';

import { wrapApiConsumer } from './api';

const { Provider, Consumer } = React.createContext();

class ContentProviderWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // data
      contentStore: ImmutableMap(),

      // actions
      contentActions: {
        fetchContentValue: this.fetchContentValue,
        updateContentViaApi: this.updateContentViaApi
      }
    };
  }

  setContent = (contentKey, contentValue) => {
    this.setState({
      contentStore: this.state.contentStore.set(contentKey, contentValue || '')
    });
  };

  fetchContentValue = async contentKey => {
    const res = await this.props.sendApiRequest('content.getContent', { contentKey });
    this.setContent(contentKey, res.contentValue);
  };

  updateContentViaApi = async (contentKey, contentValue) => {
    await this.props.sendApiRequest('content.upsertContent', { contentKey }, null, {
      contentValue
    });
    this.props.alert.info('Thành công');
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
const EnhancedContentProviderWrapper = wrapApiConsumer(withAlert(ContentProviderWrapper));

export const wrapContentProvider = WrappedComponent => props => (
  <EnhancedContentProviderWrapper>
    <WrappedComponent {...props} />
  </EnhancedContentProviderWrapper>
);

export const wrapContentConsumer = WrappedComponent => props => (
  <Consumer>{values => <WrappedComponent {...props} {...values} />}</Consumer>
);
