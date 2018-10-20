// @flow
import React from 'react';
import { Link } from 'react-router-dom';

import navbarStyles from './navbar.scss';

const CollapseToggleButton = () => (
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon" />
  </button>
);

export const Navbar = props => {
  return (
    <nav className={`navbar navbar-expand-lg ${navbarStyles.navBarWrapper}`}>
      <CollapseToggleButton />

      <div className="collapse navbar-collapse">
        <ul className={`navbar-nav mr-auto ${navbarStyles.listWrapper}`}>
          <li class="nav-item">
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="nav-item">
            <Link to="/">Thành viên</Link>
          </li>
          <li className="nav-item">
            <Link to="/tree">Cây gia phả</Link>
          </li>
          <li className="nav-item">
            <Link to="/tree">Lịch sử dòng họ</Link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
