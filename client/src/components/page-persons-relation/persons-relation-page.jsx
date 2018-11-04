import React from 'react';
import d3 from 'd3';
import { last, words } from 'lodash';
import { withRouter } from 'react-router-dom';

import { navigateToPersonDetailPage } from 'libs/navigation';
const defaultMalePicture = require('images/male-default.png');
const defaultFemalePicture = require('images/female-default.png');

const diagonal = d3.svg.diagonal().projection(d => [d.x, d.y]);

const getDefaultPicture = gender => (gender === 'male' ? defaultMalePicture : defaultFemalePicture);
const getPicture = person => {
  const picture = person.get('picture');
  if (picture) {
    return `/pictures/${picture}`;
  }

  return getDefaultPicture(person.get('gender'));
};

const linkWidth = 100;
const linkHeight = 150;
const xOffset = 80;
const yOffset = 80;

const RelationLink = ({ rel }) => {
  const data = {
    source: {
      x: rel.get('startWidth') * linkWidth + xOffset,
      y: rel.get('startHeight') * linkHeight + yOffset
    },
    target: {
      x: rel.get('endWidth') * linkWidth + xOffset,
      y: rel.get('endHeight') * linkHeight + yOffset
    }
  };
  const d = diagonal(data);

  return <path d={d} style={styles.link} />;
};

const PersonNode = ({ history, rel }) => {
  const x = rel.get('startWidth') * linkWidth + xOffset;
  const y = rel.get('startHeight') * linkHeight + yOffset;

  const person = rel.get('startPerson');
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

const PersonsRelationPage = ({ width, height, initialHeight, path, history }) => {
  return (
    <svg width={width * linkWidth + 2 * xOffset} height={height * linkHeight * 2 * yOffset}>
      {path.map((rel, i) => (
        <RelationLink key={i} rel={rel} />
      ))}
      {path.map((rel, i) => (
        <PersonNode key={i} {...{ rel, history }} />
      ))}
    </svg>
  );
};

export default withRouter(PersonsRelationPage);

const styles = {
  link: {
    fill: 'none',
    stroke: '#ccc',
    strokeWidth: '1.5px'
  },

  name: {
    fillOpacity: 1
  },

  personPicture: {
    cursor: 'pointer'
  }
};
