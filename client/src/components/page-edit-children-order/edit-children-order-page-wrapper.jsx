import React, { Component } from 'react';
import EditChildrenOrderPage from './edit-children-order-page';

class EditChildrenOrderPageWrapper extends Component {
  state = {
    children: null
  };

  render() {
    const { children } = this.state;

    return <EditChildrenOrderPage {...{ children }} />;
  }
}

export default EditChildrenOrderPageWrapper;
