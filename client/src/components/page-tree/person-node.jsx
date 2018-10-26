// @flow
import { isEmpty, map } from 'lodash';
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
  const x = (order + 1) * 21;
  const translate = `translate(${x}, 0)`;
  const picture = getPicture(person);

  return (
    <g transform={translate}>
      <image
        onClick={() => navigateToPersonDetailPage(history, person.id)}
        href={picture}
        style={styles.personPicture}
        x="0"
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

  return (
    <g transform={`translate(${personNode.x}, ${personNode.y})`}>
      <circle
        r="10"
        style={circleStyle}
        onClick={() => toggleChildren(rootPersonId, personNode.path)}
      />
      <text y="-19" dy=".35em" textAnchor="middle" style={styles.name}>
        {personNode.info.name}
      </text>
      <image
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
        map(personNode.marriages, (person, order) => (
          <MarriageNode key={order} {...{ history, person, order }} />
        ))}
    </g>
  );
};

export default withRouter(PersonNode);
