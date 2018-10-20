import React from 'react';
import MainLayoutComponent from './main';

export const wrapMainLayout = WrappedComponent => props => (
  <MainLayoutComponent>
    <WrappedComponent {...props} />
  </MainLayoutComponent>
);

export const MainLayout = MainLayoutComponent;
