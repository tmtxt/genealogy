// @flow
import React from 'react';

import { wrapPersonConsumer } from 'contexts';

export const ParentsTable = ({ person, personSelectors }) => {
  const father = person.get('father');
  const mother = person.get('mother');

  if (!father && !mother) {
    return <div />;
  }

  return (
    <div>
      <h3>Cha mẹ</h3>
      {father && (
        <div style={styles.container}>
          <img
            width="50"
            height="50"
            className="img-rounded"
            alt=""
            src={personSelectors.selectPersonPicture(father)}
          />
          <div style={styles.name}>Hello</div>
        </div>
      )}
      {mother && (
        <div style={styles.container}>
          <img
            width="50"
            height="50"
            className="img-rounded"
            alt=""
            src={personSelectors.selectPersonPicture(mother)}
          />
          <div style={styles.name}>Hello</div>
        </div>
      )}
    </div>
  );
};

export default wrapPersonConsumer(ParentsTable);

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
