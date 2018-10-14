import React from 'react';
import { Link } from 'react-router-dom';

import { wrapPersonConsumer } from 'contexts';
import { personDetailUrl } from 'libs/navigation';

export const RelatedPersonRow = ({ person, personSelectors }) => {
  return (
    <div style={styles.container}>
      <img
        width="50"
        height="50"
        className="img-rounded"
        alt=""
        src={personSelectors.selectPersonPicture(person)}
      />
      <div style={styles.name}>
        <Link to={personDetailUrl.stringify({ personId: person.get('id') })}>
          {person.get('name')}
        </Link>
      </div>
    </div>
  );
};

export default wrapPersonConsumer(RelatedPersonRow);

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
