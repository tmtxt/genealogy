// @flow
import { isEmpty, map, words, last, reverse } from 'lodash';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { navigateToPersonDetailPage } from 'libs/navigation';

const defaultMalePicture = require('images/male-default.png');
const defaultFemalePicture = require('images/female-default.png');

const getDefaultPicture = gender => (gender === 'male' ? defaultMalePicture : defaultFemalePicture);
const getPicture = person => {
  if (person.picture) {
    return `/pictures/${person.picture}`;
  }

  return getDefaultPicture(person.gender);
};

const styles = {
  circleFill: {
    cursor: 'pointer',
    stroke: 'steelblue',
    strokeWidth: '1.5px',
    fill: 'lightsteelblue'
  },

  circleEmpty: {
    cursor: 'pointer',
    stroke: 'steelblue',
    strokeWidth: '1.5px',
    fill: '#fff'
  },

  name: {
    fillOpacity: 1
  },

  personPicture: {
    cursor: 'pointer'
  }
};

const MarriageNode = ({ history, person, order }) => {
  const x = (order + 1) * 20 + 21;
  const translate = `translate(${x}, 0)`;
  const picture = getPicture(person);

  return (
    <g transform={translate}>
      <defs>
        <rect id="rect" x="-20" y="-68" width="40px" height="40px" rx="8" ry="8" />
        <clipPath id="clip">
          <use xlinkHref="#rect" />
        </clipPath>
      </defs>
      <image
        clipPath="url(#clip)"
        onClick={() => navigateToPersonDetailPage(history, person.id)}
        href={picture}
        style={styles.personPicture}
        x="-20"
        y="-68"
        width="40px"
        height="40px"
        xlinkHref={picture}
      />
    </g>
  );
};

const PersonNode = ({ personNode, history, toggleChildren, rootPersonId, marriagesEnabled }) => {
  const circleStyle =
    personNode.children || isEmpty(personNode._children) ? styles.circleEmpty : styles.circleFill;

  const fullName = personNode.info.name;
  const name = last(words(fullName));
  const namePrefix = personNode.info.gender === 'female' ? 'B.' : 'Ô.';
  const displayName = name ? `${namePrefix}${name}` : 'Không rõ';

  return (
    <g transform={`translate(${personNode.x}, ${personNode.y})`}>
      <defs>
        <rect id="rect" x="-20" y="-68" width="40px" height="40px" rx="8" ry="8" />
        <clipPath id="clip">
          <use xlinkHref="#rect" />
        </clipPath>
      </defs>
      <circle
        r="10"
        style={circleStyle}
        onClick={() => toggleChildren(rootPersonId, personNode.path)}
      />
      <text y="-19" dy=".35em" textAnchor="middle" style={styles.name}>
        {displayName}
      </text>
      <image
        clipPath="url(#clip)"
        onClick={() => navigateToPersonDetailPage(history, personNode.id)}
        style={styles.personPicture}
        href={getPicture(personNode.info)}
        x="-20"
        y="-68"
        width="40px"
        height="40px"
        xlinkHref={getPicture(personNode.info)}
      />
      {marriagesEnabled &&
        map(reverse(personNode.marriages), (person, order) => (
          <MarriageNode
            key={personNode.marriages.length - 1 - order}
            {...{ history, person, order: personNode.marriages.length - 1 - order }}
          />
        ))}
    </g>
  );
};

export default withRouter(PersonNode);
