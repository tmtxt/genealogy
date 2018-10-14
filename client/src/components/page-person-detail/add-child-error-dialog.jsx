// @flow
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const AddChildErrorDialog = ({ isOpen, toggle }) => (
  <Modal {...{ isOpen, toggle }}>
    <ModalHeader toggle={toggle}>Lỗi</ModalHeader>
    <ModalBody>Cần thêm vợ/chồng trước</ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={toggle}>
        Quay lại
      </Button>
    </ModalFooter>
  </Modal>
);

export default AddChildErrorDialog;
