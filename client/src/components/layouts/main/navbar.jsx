// @flow
import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router';

import { navigateToTreePage, navigateToHomePage } from 'libs/navigation';

import styles from './navbar.scss';

class NavbarComponent extends Component {
  state = { isOpen: false };
  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  navigate = (e, navigateFunc) => {
    e.preventDefault();
    navigateFunc(this.props.history);
  };

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
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavbarComponent);
