import React, { Component } from 'react';
import { flowRight } from 'lodash';

import { withPersonDataFromParam } from 'components/person';
import { wrapPersonConsumer } from 'contexts';
import { navigateToPersonDetailPage } from 'libs/navigation';
import { requireLoggedInUser } from 'components/user';

import EditPicturePage from './edit-picture-page';

class EpicPicturePageWrapper extends Component {
  state = {
    file: null
  };

  handleFileUpdate = file => this.setState({ file });

  handleSubmit = () => {
    const {
      personId,
      personActions: { updatePictureViaApi }
    } = this.props;

    updatePictureViaApi(personId, this.state.file);
  };

  componentDidUpdate(prevProps) {
    const { personMeta: prevMeta } = prevProps;
    const { personMeta: currentMeta, history, personId } = this.props;

    if (prevMeta.get('isUpdating') && !currentMeta.get('isUpdating')) {
      navigateToPersonDetailPage(history, personId);
    }
  }

  render() {
    const { handleFileUpdate, handleSubmit } = this;
    const { personMeta } = this.props;

    const isUpdating = !!personMeta.get('isUpdating');
    return <EditPicturePage {...{ isUpdating, handleFileUpdate, handleSubmit }} />;
  }
}

const enhance = flowRight([requireLoggedInUser, withPersonDataFromParam, wrapPersonConsumer]);
export default enhance(EpicPicturePageWrapper);
