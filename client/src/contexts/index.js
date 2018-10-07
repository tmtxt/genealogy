import React, { Component } from 'react';

export const { Provider: PersonProvider, Consumer: PersonConsumer } = React.createContext();

class PersonContextWrapper extends Component {
  state = {
    // data
    personMap: {
      abc: 'def'
    }

    // actions
  };

  render() {
    return <PersonProvider value={this.state}>{this.props.children}</PersonProvider>;
  }
}

class ContextWrapper extends Component {
  render() {
    return <PersonContextWrapper>{this.props.children}</PersonContextWrapper>;
  }
}

export default ContextWrapper;
