import React from 'react';
import { Loader } from '../shared';

export const EditChildrenOrderPage = ({ children }) => {
  if (!children) {
    return <Loader />;
  }

  return <div />;
};

export default EditChildrenOrderPage;
