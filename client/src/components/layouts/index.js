import React from 'react';
import { Route } from 'react-router-dom';

import MainLayout from './main';
import FullWidthLayout from './full-width';
import AdminLayout from './admin';

export const MainLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <MainLayout>
        <Component {...props} />
      </MainLayout>
    )}
  />
);

export const FullWidthLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <FullWidthLayout>
        <Component {...props} />
      </FullWidthLayout>
    )}
  />
);

export const AdminLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <AdminLayout>
        <Component {...props} />
      </AdminLayout>
    )}
  />
);
