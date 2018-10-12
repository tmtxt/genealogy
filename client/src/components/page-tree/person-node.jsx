// @flow
import { isEmpty } from 'lodash';
import React from 'react';

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
  }
};

export const PersonNode = ({ personNode }) => {
  const circleStyle =
    personNode.children || isEmpty(personNode._children) ? styles.circleEmpty : styles.circleFill;

  return (
    <g transform={`translate(${personNode.x}, ${personNode.y})`}>
      <circle r="10" style={circleStyle} />
    </g>
  );
};

export default PersonNode;
