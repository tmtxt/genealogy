import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const DeleteErrorDialog = ({ isOpen, toggle }) => (
  <Modal {...{ isOpen, toggle }}>
    <ModalHeader toggle={toggle}>Lỗi</ModalHeader>
    <ModalBody>Cần xóa tất cả con cái trước</ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={toggle}>
        Quay lại
      </Button>
    </ModalFooter>
  </Modal>
);

export default DeleteErrorDialog;
