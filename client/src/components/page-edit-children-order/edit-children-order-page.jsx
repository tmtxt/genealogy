import React from 'react';
import { Loader } from '../shared';

export const EditChildrenOrderPage = ({ childrenInfo }) => {
  if (!childrenInfo) {
    return <Loader />;
  }

  if (!childrenInfo.get('children').size) {
    return <div>Không có con</div>;
  }

  return <div />;
};

export default EditChildrenOrderPage;
