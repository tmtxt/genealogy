import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { wrapPersonConsumer } from 'contexts';
import { navigateToTreePage } from 'libs/navigation';

const withDeleteDialogHandler = WrappedComponent => {
  class WithDeleteDialogHandler extends Component {
    state = {
      showErrorDialog: false
    };

    componentDidUpdate(prevProps) {
      const { personMeta: prevMeta } = prevProps;
      const { history, personMeta: currentMeta } = this.props;

      if (prevMeta.get('isDeleting') && !currentMeta.get('isDeleting')) {
        navigateToTreePage(history);
        return;
      }
    }

    toggleErrorDialog = () => this.setState({ showErrorDialog: !this.state.showErrorDialog });

    deletePerson = () => {
      const { personId, person } = this.props;
      const children = person.get('children');

      if (children.size) {
        this.toggleErrorDialog();
        return;
      }

      this.props.personActions.deletePersonViaApi(personId);
    };

    render() {
      const { toggleErrorDialog, deletePerson } = this;
      const { showErrorDialog } = this.state;

      return (
        <div>
          <WrappedComponent {...this.props} {...{ deletePerson }} />
          <Modal isOpen={showErrorDialog} toggle={toggleErrorDialog}>
            <ModalHeader toggle={toggleErrorDialog}>Lỗi</ModalHeader>
            <ModalBody>Cần xóa tất cả con cái trước</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggleErrorDialog}>
                Quay lại
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
  }

  return wrapPersonConsumer(WithDeleteDialogHandler);
};

export default withDeleteDialogHandler;
