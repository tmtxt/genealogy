import React from 'react';
import d3 from 'd3';

import { linkWidth, linkHeight, xOffset, yOffset } from './config';

const diagonal = d3.svg.diagonal().projection(d => [d.x, d.y]);

const RelationLink = ({ rel }) => {
  // path
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

  // text
  const x = data.source.x + (data.target.x - data.source.x) / 2;
  const y = data.source.y + (data.target.y - data.source.y) / 2;
  const type = rel.get('type');
  const textMap = {
    Husband_wife: 'Vợ chồng',
    Wife_husband: 'Vợ chồng',
    Father_child: 'Cha con',
    Child_father: 'Cha con',
    Mother_child: 'Mẹ con',
    Child_mother: 'Mẹ con'
  };
  const text = textMap[type];

  return (
    <g>
      <path d={d} style={styles.link} />
      <text x={x} y={y} dy=".35em" textAnchor="middle" style={styles.name}>
        {text}
      </text>
    </g>
  );
};

export default RelationLink;

const styles = {
  link: {
    fill: 'none',
    stroke: '#ccc',
    strokeWidth: '1.5px'
  },

  name: {
    fillOpacity: 1
  }
};
