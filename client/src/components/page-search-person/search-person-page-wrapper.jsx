// @flow
import React, { Component } from 'react';
import SearchPersonPage from './search-person-page';

type Props = {};
type State = { searchKey: string };

// state wrapper class
class SearchPersonPageWrapper extends Component<Props, State> {
  state = { searchKey: '' };

  handleSearchKeyChange = (searchKey: string) => this.setState({ searchKey });

  render() {
    return (
      <SearchPersonPage
        searchKey={this.state.searchKey}
        onSearchKeyChange={this.handleSearchKeyChange}
      />
    );
  }
}

export default SearchPersonPageWrapper;
