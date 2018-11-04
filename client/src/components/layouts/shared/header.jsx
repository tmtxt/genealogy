import React from 'react';
import _ from 'lodash';

import bannerStyles from './banner.scss';

export const Header = props => (
  <header className="site-header">
    <div className={`container-fluid ${bannerStyles.headerBanner}`}>
      <div className={bannerStyles.headerContainer}>
        <div className={bannerStyles.siteName}>
          {_.get(window, ['__SERVER_DATA__', 'pageTitle'], 'Trần Văn Gia Phả')}
        </div>
        <div className={bannerStyles.headline}>Gìn giữ cho muôn đời sau</div>
      </div>
    </div>
  </header>
);

export default Header;
