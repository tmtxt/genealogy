import React from 'react';

import bannerStyles from './banner.scss';

export const Header = props => (
  <header className="site-header">
    <div className={`container-fluid ${bannerStyles.headerBanner}`}>
      <div className={bannerStyles.headerContainer}>
        <div className={bannerStyles.siteName}>Trần Văn gia phả</div>
        <div className={bannerStyles.headline}>Gìn giữ cho muôn đời sau</div>
      </div>
    </div>
  </header>
);

export default Header;
