// @flow
import React, { Component } from 'react';
import SearchPersonPage from './search-person-page';

type Props = {
  match: {
    params: {
      fromPersonId?: string
    }
  }
};
type State = { searchKey: string };

// state wrapper class
class SearchPersonPageWrapper extends Component<Props, State> {
  state = { searchKey: '' };

  handleSearchKeyChange = (searchKey: string) => this.setState({ searchKey });

  render() {
    const {
      match: {
        params: { fromPersonId }
      }
    } = this.props;

    return (
      <SearchPersonPage
        searchKey={this.state.searchKey}
        onSearchKeyChange={this.handleSearchKeyChange}
        {...{ fromPersonId }}
      />
    );
  }
}

export default SearchPersonPageWrapper;
