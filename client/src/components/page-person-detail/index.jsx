import React from 'react';

import PersonDetailPage from './person-detail-page';

const PersonDetailPageWrapper = props => {
  const {
    match: {
      params: { personId }
    }
  } = props;

  return <PersonDetailPage {...{ personId }} />;
};

export default PersonDetailPageWrapper;
