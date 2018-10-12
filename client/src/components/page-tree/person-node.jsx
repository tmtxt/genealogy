// @flow
import { isEmpty } from 'lodash';
import React from 'react';

const defaultMalePicture = require('images/male-default.svg');
const defaultFemalePicture = require('images/female-default.svg');

const getDefaultPicture = gender => (gender === 'male' ? defaultMalePicture : defaultFemalePicture);

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

export const PersonNode = ({ personNode }) => {
  const circleStyle =
    personNode.children || isEmpty(personNode._children) ? styles.circleEmpty : styles.circleFill;

  return (
    <g transform={`translate(${personNode.x}, ${personNode.y})`}>
      <circle r="10" style={circleStyle} />
      <text y="-19" dy=".35em" textAnchor="middle" style={styles.name}>
        {personNode.info.name}
      </text>
      <image
        style={styles.personPicture}
        href={personNode.info.picture || getDefaultPicture(personNode.info.gender)}
        x="-20"
        y="-68"
        width="40px"
        height="40px"
      />
    </g>
  );
};

export default PersonNode;
