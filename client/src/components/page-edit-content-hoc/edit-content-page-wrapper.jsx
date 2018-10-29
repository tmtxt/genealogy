import _ from 'lodash';
import { Component } from 'react';
import React from 'react';
import { wrapContentConsumer } from 'contexts';
import EditContentPage from './edit-content-page';

const createEditContentPage = (contentKey, contentTitle) => {
  class EditContentPageWrapper extends Component {
    componentDidMount() {
      this.props.contentActions.fetchContentValue(contentKey);
    }

    state = {
      content: null
    };

    static getDerivedStateFromProps(props, state) {
      if (_.isNil(state.content) && !_.isNil(props.contentStore.get(contentKey))) {
        return {
          content: props.contentStore.get(contentKey)
        };
      }

      return null;
    }

    handleContentChanged = content => this.setState({ content });

    handleSubmit = () => {
      this.props.contentActions.updateContentViaApi(contentKey, this.state.content);
    };

    render() {
      const { handleContentChanged: onContentChanged, handleSubmit: onSubmit } = this;
      const { content } = this.state;

      return <EditContentPage {...{ content, contentTitle, onContentChanged, onSubmit }} />;
    }
  }

  return wrapContentConsumer(EditContentPageWrapper);
};

export default createEditContentPage;
