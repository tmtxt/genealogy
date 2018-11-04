import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPersonsRelation } from 'store/actions/persons-relation';
import { selectPersonsRelation } from 'store/selectors/persons-relation';
import PersonsRelationPage from './persons-relation-page';
import { Loader } from '../shared';

class PersonsRelationPageWrapper extends Component {
  componentDidMount() {
    this.props.fetchPersonsRelation(0, 24);
  }

  computeGraphWidth() {
    const { path } = this.props;
    return path.size;
  }

  computeGraphHeight() {
    const { path } = this.props;

    let min = 0;
    let max = 0;
    let current = 0;

    path.forEach(rel => {
      const type = rel.get('type');

      if (type === 'Father_child' || type === 'Mother_child') {
        current++;
      } else if (type === 'Child_father' || type === 'Child_mother') {
        current--;
      }

      if (current > max) max = current;
      if (current < min) min = current;

      return rel;
    });

    return {
      height: max - min,
      initialHeight: 0 - min,
      path
    };
  }

  computePathWithPosition = (initialHeight, path) => {
    let startHeight = initialHeight;
    let startWidth = 0;

    return path.map(rel => {
      const type = rel.get('type');

      rel = rel.set('startHeight', startHeight).set('startWidth', startWidth);

      startWidth++;

      if (type === 'Father_child' || type === 'Mother_child') {
        startHeight++;
      } else if (type === 'Child_father' || type === 'Child_mother') {
        startHeight--;
      }

      rel = rel.set('endHeight', startHeight).set('endWidth', startWidth);

      return rel;
    });
  };

  render() {
    const { path } = this.props;

    if (!path) return <Loader />;

    const width = this.computeGraphWidth();
    const { height, initialHeight } = this.computeGraphHeight();
    const updatedPath = this.computePathWithPosition(initialHeight, path);

    return <PersonsRelationPage {...{ width, height, initialHeight, path: updatedPath }} />;
  }
}

export default connect(
  (state, prop) => {
    return { path: selectPersonsRelation(state, 0, 24) };
  },
  { fetchPersonsRelation }
)(PersonsRelationPageWrapper);
