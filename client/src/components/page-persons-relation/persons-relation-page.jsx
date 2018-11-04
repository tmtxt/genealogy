import React from 'react';
import { withRouter } from 'react-router-dom';

import RelationLink from './relation-link';
import PersonNode from './person-node';
import { linkWidth, linkHeight, xOffset, yOffset } from './config';

const PersonsRelationPage = ({ width, height, initialHeight, path, history }) => {
  return (
    <svg width={width * linkWidth + 2 * xOffset} height={height * linkHeight + 2 * yOffset}>
      {path.map((rel, i) => (
        <RelationLink key={i} rel={rel} />
      ))}
      {path.map((rel, i) => (
        <PersonNode key={i} {...{ rel, history }} isLast={i === path.size - 1} />
      ))}
    </svg>
  );
};

export default withRouter(PersonsRelationPage);
