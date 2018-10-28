import React, { Component } from 'react';
import { Loader } from '../shared';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { navigateToPersonDetailPage } from 'libs/navigation';

export class EditChildrenOrderPage extends Component {
  state = {
    childrenInfo: null
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.childrenInfo && props.childrenInfo) {
      return {
        childrenInfo: props.childrenInfo
      };
    }

    return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isUpdating && !this.props.isUpdating) {
      navigateToPersonDetailPage(this.props.history, this.props.personId);
    }
  }

  /**
   * Update the child order in the state
   * @param {int} childId
   * @param {int} childOrder
   */
  handleChildOrderUpdate = (childId, childOrder) => {
    const { childrenInfo } = this.state;
    const children = childrenInfo
      .get('children')
      .map(child => (child.get('id') === childId ? child.set('order', childOrder) : child));
    this.setState({
      childrenInfo: childrenInfo.set('children', children)
    });
  };

  render() {
    const { personId, isUpdating } = this.props;
    let { childrenInfo } = this.state;

    if (!childrenInfo) {
      return <Loader />;
    }

    const children = childrenInfo.get('children');
    if (!children.size) {
      return <div>Không có con</div>;
    }

    return (
      <Form>
        {children.map(child => (
          <FormGroup key={child.get('id')}>
            <Label>{child.get('name') || 'Không rõ tên'}</Label>
            <Input
              type="number"
              value={child.get('order')}
              onChange={e => this.handleChildOrderUpdate(child.get('id'), e.target.value)}
            />
          </FormGroup>
        ))}

        <Button
          disabled={isUpdating}
          color="primary"
          onClick={() =>
            this.props.updateChildrenOrder(personId, this.state.childrenInfo.get('children'))
          }
        >
          Cập nhật
        </Button>
        {isUpdating && <Loader />}
      </Form>
    );
  }
}

export default withRouter(EditChildrenOrderPage);
