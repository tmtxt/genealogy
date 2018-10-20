import React from 'react';

import bannerStyles from './banner.scss';

import Navbar from './navbar';

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
