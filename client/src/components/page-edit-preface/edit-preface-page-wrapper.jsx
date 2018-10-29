import React, { Component } from 'react';
import _ from 'lodash';
import { wrapContentConsumer } from '../../contexts';

import EditPrefacePage from './edit-preface-page';

const contentKey = 'preface';

class EditPrefacePageWrapper extends Component {
  componentDidMount() {
    this.props.contentActions.fetchContentValue(contentKey);
  }

  state = {
    preface: null
  };

  static getDerivedStateFromProps(props, state) {
    if (_.isNil(state.preface) && !_.isNil(props.contentStore.get(contentKey))) {
      return {
        preface: props.contentStore.get(contentKey)
      };
    }

    return null;
  }

  handlePrefaceChanged = preface => this.setState({preface});

  render() {
    const {handlePrefaceChanged: onPrefacedChanged} = this;
    const { preface } = this.state;

    return <EditPrefacePage {...{ preface, onPrefacedChanged }} />;
  }
}

export default wrapContentConsumer(EditPrefacePageWrapper);
