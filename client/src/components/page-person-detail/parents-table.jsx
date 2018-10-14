import React from 'react';

import RelatedPersonRow from './related-person-row';

export const ParentsTable = ({ person }) => {
  const father = person.get('father');
  const mother = person.get('mother');

  if (!father && !mother) {
    return <div />;
  }

  return (
    <div>
      <h3>Cha mẹ</h3>
      {father && <RelatedPersonRow person={father} />}
      {mother && <RelatedPersonRow person={mother} />}
    </div>
  );
};

export default ParentsTable;
