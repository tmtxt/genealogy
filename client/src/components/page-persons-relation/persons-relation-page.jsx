import React from 'react';
import d3 from 'd3';
import { List as ImmutableList } from 'immutable';

const diagonal = d3.svg.diagonal().projection(d => [d.x, d.y]);

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

  return (
    <path
      d={d}
      style={{
        fill: 'none',
        stroke: '#ccc',
        strokeWidth: '1.5px'
      }}
    />
  );
};

const PersonsRelationPage = ({ width, height, initialHeight, path }) => {
  return (
    <svg width={width * linkWidth + 2 * xOffset} height={height * linkHeight * 2 * yOffset}>
      {path.map((rel, i) => (
        <RelationLink key={i} rel={rel} />
      ))}
    </svg>
  );
};

export default PersonsRelationPage;
