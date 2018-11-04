import React from 'react';
import d3 from 'd3';
import {List as ImmutableList} from 'immutable';

const diagonal = d3.svg.diagonal().projection(d => [d.x, d.y]);

const linkWidth = 100;
const linkHeight = 150;

const RelationLink = ({ rel }) => {
  console.log(rel.toJS());

  return <text>a</text>;
};

const PersonsRelationPage = ({ width, height, initialHeight, path }) => {
  return (
    <svg width={width * linkWidth + 200} height={height * linkHeight}>
      {path.forEach((rel, i) => {

      })}
    </svg>
  );
};

export default PersonsRelationPage;
