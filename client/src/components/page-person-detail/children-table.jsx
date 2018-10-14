import React from 'react';

import RelatedPersonRow from './related-person-row';

export const ChildrenTable = ({ person }) => {
  const children = person.get('children');

  if (!children || !children.size) {
    return <div />;
  }

  return (
    <div>
      <h3>Con cái</h3>
      {children.map((child, idx) => (
        <RelatedPersonRow key={idx} person={child} />
      ))}
    </div>
  );
};

export default ChildrenTable;
