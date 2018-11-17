// @flow
import _ from 'lodash';
import React, { Component } from 'react';

type Props = {
  size?: number
};

/**
 * Loader
 * optional props with size
 */
class Loader extends Component<Props> {
  getSizeClassName() {
    const { size } = this.props;

    if (!size) return '';
    if (size === 1) return 'fa-lg';
    if (_.includes([2, 3, 4, 5], size)) return `fa-${size}x`;
    return '';
  }

  render() {
    const sizeClass = this.getSizeClassName();
    return <i className={`fa fa-spinner fa-spin ${sizeClass} fa-fw`} />;
  }
}

export default Loader;
