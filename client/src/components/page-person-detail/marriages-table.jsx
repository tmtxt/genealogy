// @flow
import React from 'react';

import RelatedPersonRow from './related-person-row';

export const MarriagesTable = ({ person }) => {
  const marriages = person.get('marriages');
  const gender = person.get('gender');

  if (!marriages || !marriages.size) {
    return <div />;
  }

  const titleText = gender === 'male' ? 'Vợ' : 'Chồng';
  return (
    <div>
      <h3>{titleText}</h3>
      {marriages.map((marriage, idx) => (
        <RelatedPersonRow key={idx} person={marriage} />
      ))}
    </div>
  );
};

export default MarriagesTable;
