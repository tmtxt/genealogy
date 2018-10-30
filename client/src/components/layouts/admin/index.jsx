import React, { Component } from 'react';
import MainLayout from '../main';
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import {
  navigateToEditGeneralInfoPage,
  navigateToChangePasswordPage,
  navigateToEditPrefacePage,
  navigateToEditHistoryPage
} from 'libs/navigation';

export class AdminLayout extends Component {
  navigate = (e, navigateFunc) => {
    e.preventDefault();
    navigateFunc(this.props.history);
  };

  render() {
    return (
      <MainLayout>
        <Row>
          <Col md="3">
            <ListGroup flush>
              <ListGroupItem
                tag="a"
                href="/"
                onClick={e => this.navigate(e, navigateToChangePasswordPage)}
              >
                Đổi mật khẩu
              </ListGroupItem>
              <ListGroupItem
                tag="a"
                href="/"
                onClick={e => this.navigate(e, navigateToEditPrefacePage)}
              >
                Sửa Lời nói đầu
              </ListGroupItem>
              <ListGroupItem
                tag="a"
                href="/"
                onClick={e => this.navigate(e, navigateToEditGeneralInfoPage)}
              >
                Sửa Thông tin dòng họ
              </ListGroupItem>
              <ListGroupItem
                tag="a"
                href="/"
                onClick={e => this.navigate(e, navigateToEditHistoryPage)}
              >
                Sửa Lịch sử dòng họ
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md="9">{this.props.children}</Col>
        </Row>
      </MainLayout>
    );
  }
}

export default withRouter(AdminLayout);
