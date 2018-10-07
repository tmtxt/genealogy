import React from 'react';
import MainLayout from './main';

export const wrapMainLayout = WrappedComponent => props => (
  <MainLayout>
    <WrappedComponent {...props} />
  </MainLayout>
);
