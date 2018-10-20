import React from 'react';
import { Link } from 'react-router-dom';

import { personDetailUrl } from 'libs/navigation';

export const RelatedPersonRow = ({ person }) => {
  return (
    <div style={styles.container}>
      <img width="50" height="50" className="img-rounded" alt="" src={person.getPictureUrl()} />
      <div style={styles.name}>
        <Link to={personDetailUrl.stringify({ personId: person.get('id') })}>
          {person.getDisplayName()}
        </Link>
      </div>
    </div>
  );
};

export default RelatedPersonRow;

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'flex-start'
  },

  name: {
    marginLeft: 10
  }
};
