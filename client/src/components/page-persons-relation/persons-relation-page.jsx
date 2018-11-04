import React from 'react';
import { last, words } from 'lodash';
import { withRouter } from 'react-router-dom';

import { navigateToPersonDetailPage } from 'libs/navigation';

import RelationLink from './relation-link';

const defaultMalePicture = require('images/male-default.png');
const defaultFemalePicture = require('images/female-default.png');

const getDefaultPicture = gender => (gender === 'male' ? defaultMalePicture : defaultFemalePicture);
const getPicture = person => {
  const picture = person.get('picture');
  if (picture) {
    return `/pictures/${picture}`;
  }

  return getDefaultPicture(person.get('gender'));
};

const linkWidth = 150;
const linkHeight = 150;
const xOffset = 80;
const yOffset = 80;

const PersonNode = ({ history, x, y, person }) => {
  const fullName = person.get('name');
  const name = last(words(fullName));
  const namePrefix = person.get('gender') === 'female' ? 'B.' : 'Ô.';
  const displayName = name ? `${namePrefix}${name}` : 'Không rõ';

  return (
    <g transform={`translate(${x}, ${y})`}>
      <text y="23" dy=".35em" textAnchor="middle" style={styles.name}>
        {displayName}
      </text>
      <defs>
        <rect id="rect" x="-20" y="-30" width="40px" height="40px" rx="8" ry="8" />
        <clipPath id="clip">
          <use xlinkHref="#rect" />
        </clipPath>
      </defs>
      <image
        onClick={() => navigateToPersonDetailPage(history, person.get('id'))}
        clipPath="url(#clip)"
        style={styles.personPicture}
        href={getPicture(person)}
        x="-20"
        y="-30"
        width="40px"
        height="40px"
        xlinkHref={getPicture(person)}
      />
    </g>
  );
};

const ComposePersonNode = ({ history, rel, isLast }) => {
  const startX = rel.get('startWidth') * linkWidth + xOffset;
  const startY = rel.get('startHeight') * linkHeight + yOffset;
  const startPerson = rel.get('startPerson');

  if (!isLast) {
    return <PersonNode x={startX} y={startY} person={startPerson} {...{ history }} />;
  }

  const endX = rel.get('endWidth') * linkWidth + xOffset;
  const endY = rel.get('endHeight') * linkHeight + yOffset;
  const endPerson = rel.get('endPerson');

  return (
    <g>
      <PersonNode x={startX} y={startY} person={startPerson} {...{ history }} />
      <PersonNode x={endX} y={endY} person={endPerson} {...{ history }} />
    </g>
  );
};

const PersonsRelationPage = ({ width, height, initialHeight, path, history }) => {
  return (
    <svg width={width * linkWidth + 2 * xOffset} height={height * linkHeight + 2 * yOffset}>
      {path.map((rel, i) => (
        <RelationLink key={i} rel={rel} />
      ))}
      {path.map((rel, i) => (
        <ComposePersonNode key={i} {...{ rel, history }} isLast={i === path.size - 1} />
      ))}
    </svg>
  );
};

export default withRouter(PersonsRelationPage);

const styles = {
  name: {
    fillOpacity: 1
  },

  personPicture: {
    cursor: 'pointer'
  }
};
