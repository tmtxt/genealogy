import React from 'react';
import { Link } from 'react-router-dom';

import bannerStyles from './banner.scss';
import navbarStyles from './navbar.scss';

import Navbar from './navbar';

/* const Navbar = () => (
 *   <nav className={`navbar navbar-default ${navbarStyles.navBarWrapper}`}>
 *     <div className="container-fluid">
 *       <div className={`container ${navbarStyles.innerWrapper}`}>
 *         <div>
 *           <ul className={`nav ${navbarStyles.listWrapper}`}>
 *             <li>
 *               <Link to="/">Trang chủ</Link>
 *             </li>
 *             <li>
 *               <Link to="/">Thành viên</Link>
 *             </li>
 *             <li>
 *               <Link to="/tree">Cây gia phả</Link>
 *             </li>
 *             <li>
 *               <Link to="/">Lịch sử dòng họ</Link>
 *             </li>
 *           </ul>
 *
 *           <ul className={`nav navbar-nav navbar-right ${navbarStyles.listWrapper}`}>
 *             <li>
 *               <Link to="/login">Đăng nhập</Link>
 *             </li>
 *           </ul>
 *         </div>
 *       </div>
 *     </div>
 *   </nav>
 * );*/

const MainLayout = props => (
  <div className="site">
    <header className="site-header">
      <div className={`container-fluid ${bannerStyles.headerBanner}`}>
        <div className={bannerStyles.headerContainer}>
          <div className={bannerStyles.siteName}>Trần Văn gia phả</div>
          <div className={bannerStyles.headline}>Gìn giữ cho muôn đời sau</div>
        </div>
      </div>
    </header>

    <Navbar {...props} />

    <main className="site-content">
      <div className="container site-container">{props.children}</div>
    </main>
  </div>
);

export default MainLayout;
