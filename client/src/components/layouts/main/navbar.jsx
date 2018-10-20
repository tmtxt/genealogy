// @flow
import { flowRight } from 'lodash';
import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router';

import { navigateToTreePage, navigateToHomePage, navigateToLoginPage } from 'libs/navigation';
import { wrapUserConsumer } from 'contexts';

import styles from './navbar.scss';

class NavbarComponent extends Component {
  state = { isOpen: false };
  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  navigate = (e, navigateFunc) => {
    e.preventDefault();
    navigateFunc(this.props.history);
  };

  renderRightNav() {
    const {
      userSelectors: { selectCurrentUser }
    } = this.props;
    const user = selectCurrentUser();

    let userLink;

    if (!user.get('isLoggedIn')) {
      userLink = (
        <NavLink href="/" onClick={e => this.navigate(e, navigateToLoginPage)}>
          Đăng nhập
        </NavLink>
      );
    } else {
      userLink = (
        <NavLink href="/" onClick={e => this.navigate(e, navigateToLoginPage)}>
          Đăng xuất {user.get('username')}
        </NavLink>
      );
    }

    return (
      <Nav className={`ml-auto ${styles.listWrapper}`} navbar>
        <NavItem>{userLink}</NavItem>
      </Nav>
    );
  }

  render() {
    return (
      <div>
        <Navbar expand="md" light className={styles.navBarWrapper}>
          <div className="container">
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className={`mr-auto ${styles.listWrapper}`} navbar>
                <NavItem>
                  <NavLink href="/" onClick={e => this.navigate(e, navigateToHomePage)}>
                    Trang chủ
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/">Thành viên</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/" onClick={e => this.navigate(e, navigateToTreePage)}>
                    Cây gia phả
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/">Lịch sử dòng họ</NavLink>
                </NavItem>
              </Nav>
              {this.renderRightNav()}
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

const enhance = flowRight([withRouter, wrapUserConsumer]);
export default enhance(NavbarComponent);
