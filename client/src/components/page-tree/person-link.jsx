// @flow
import React from 'react';
import d3 from 'd3';

const diagonal = d3.svg.diagonal().projection(d => [d.x, d.y]);

const styles = {
  link: {
    fill: 'none',
    stroke: '#ccc',
    strokeWidth: '1.5px'
  }
};

export const PersonLink = ({ personLink }) => {
  const d = diagonal(personLink);
  return <path d={d} style={styles.link} />;
};

export default PersonLink;
