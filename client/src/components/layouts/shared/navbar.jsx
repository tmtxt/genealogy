import { flowRight } from 'lodash';
import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { withRouter } from 'react-router';

import {
  navigateToTreePage,
  navigateToHomePage,
  navigateToLoginPage,
  navigateToAdminIndexPage
} from 'libs/navigation';
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
        <NavItem>
          <NavLink href="/" onClick={e => this.navigate(e, navigateToLoginPage)}>
            Đăng nhập
          </NavLink>
        </NavItem>
      );
    } else {
      const logout = e => {
        e.preventDefault();
        this.props.userActions.logout();
        navigateToHomePage(this.props.history);
      };
      userLink = (
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Xin chào {user.get('username')}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={logout}>Đăng xuất</DropdownItem>
            <DropdownItem onClick={e => this.navigate(e, navigateToAdminIndexPage)}>
              Quản trị
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }

    return (
      <Nav className={`ml-auto ${styles.listWrapper}`} navbar>
        {userLink}
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
                {/*<NavItem>*/}
                {/*<NavLink href="/">Thành viên</NavLink>*/}
                {/*</NavItem>*/}
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
