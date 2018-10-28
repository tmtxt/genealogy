import React from 'react';

import { editChildrenOrderUrl } from 'libs/navigation';
import RelatedPersonRow from './related-person-row';
import { Link } from 'react-router-dom';

export const ChildrenTable = ({ personId, person, isLoggedIn }) => {
  const children = person.get('children');

  if (!children || !children.size) {
    return <div />;
  }

  console.log(children.size > 1);

  return (
    <div>
      <h3>Con cái</h3>
      {children.size > 1 &&
        isLoggedIn() && <Link to={editChildrenOrderUrl.stringify({ personId })}>Sửa thứ tự</Link>}
      {children.map((child, idx) => (
        <RelatedPersonRow key={idx} person={child} />
      ))}
    </div>
  );
};

export default ChildrenTable;
