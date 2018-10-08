// @flow
import _ from 'lodash';
import React, { Component } from 'react';

/**
* Loader
* optional props with size
*/
class Loader extends Component {
  getSizeClassName() {
    const {
      size
    } = this.props;

    if (!size) {
      return '';
    }

    if (size === 1) {
      return 'fa-lg';
    }

    if (_.includes([2, 3, 4, 5], size)) {
      return `fa-${size}x`;
    }

    return '';
  }

  props: {
    size?: number
  };

  render() {
    const sizeClass = this.getSizeClassName();
    return <i className={`fa fa-spinner fa-spin ${sizeClass} fa-fw`} />;
  }
}

export default Loader;
