import React from 'react';

import Header from '../shared/header';
import Navbar from '../shared/navbar';

const MainLayout = props => (
  <div className="site">
    <Header />
    <Navbar {...props} />

    <main className="site-content">
      <div className="container site-container">{props.children}</div>
    </main>
  </div>
);

export default MainLayout;
