import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { navigateToAddChildPage } from 'libs/navigation';

const withAddChildDialogHandler = WrappedComponent => {
  class WithAddChildDialogHandler extends Component {
    state = {
      showErrorDialog: false
    };

    toggleErrorDialog = () => this.setState({ showErrorDialog: !this.state.showErrorDialog });

    addChild = () => {
      const { personId, person } = this.props;
      const marriages = person.get('marriages');

      if (!marriages.size) {
        this.toggleErrorDialog();
        return;
      }

      navigateToAddChildPage(this.props.history, personId);
    };

    render() {
      // TODO Auto select marriage when only has 1
      const { addChild, toggleErrorDialog } = this;
      const { showErrorDialog } = this.state;

      return (
        <div>
          <WrappedComponent {...this.props} {...{ addChild }} />
          <Modal isOpen={showErrorDialog} toggle={toggleErrorDialog}>
            <ModalHeader toggle={toggleErrorDialog}>Lỗi</ModalHeader>
            <ModalBody>Cần thêm vợ/chồng trước</ModalBody>
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

  return WithAddChildDialogHandler;
};

export default withAddChildDialogHandler;
