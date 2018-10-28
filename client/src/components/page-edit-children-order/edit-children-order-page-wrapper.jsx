import React, { Component } from 'react';
import EditChildrenOrderPage from './edit-children-order-page';
import { wrapChildrenOrderConsumer } from 'contexts';

const getPersonIdFromProps = props => props.match.params.personId;

class EditChildrenOrderPageWrapper extends Component {
  componentDidMount() {
    const personId = getPersonIdFromProps(this.props);
    this.props.childrenOrderActions.fetchChildrenWithOrder(personId);
  }

  render() {
    const {
      childrenOrderSelectors: { selectChildrenInfo },
      childrenOrderActions: { updateChildrenOrder }
    } = this.props;
    const personId = getPersonIdFromProps(this.props);
    const childrenInfo = selectChildrenInfo(personId);
    const isUpdating = childrenInfo && childrenInfo.get('isUpdating');

    return (
      <EditChildrenOrderPage {...{ personId, childrenInfo, updateChildrenOrder, isUpdating }} />
    );
  }
}

export default wrapChildrenOrderConsumer(EditChildrenOrderPageWrapper);
