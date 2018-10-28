import React, { Component } from 'react';
import { Loader } from '../shared';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

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

  /**
   * Update the child order in the state
   * @param {int} childId
   * @param {int} childOrder
   */
  handleChildOrderUpdate = (childId, childOrder) => {
    childOrder = parseInt(childOrder);
    if (!childOrder || childOrder < 1) {
      childOrder = 1;
    }

    const { childrenInfo } = this.state;
    const children = childrenInfo
      .get('children')
      .map(child => (child.get('id') === childId ? child.set('order', childOrder) : child));
    this.setState({
      childrenInfo: childrenInfo.set('children', children)
    });
  };

  render() {
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

        <Button color="primary">Cập nhật</Button>
      </Form>
    );
  }
}

export default EditChildrenOrderPage;
