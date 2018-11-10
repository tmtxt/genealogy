// @flow
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { Map as ImmutableMap } from 'immutable';

import { findPersonByName } from 'store/actions/person';
import { selectPersonSearchResults } from 'store/selectors/person-search-results';
import Loader from 'components/shared/loader';

type Props = {
  searchKey: string,
  onSearchKeyChange: string => void,
  findPersonByName: typeof findPersonByName,
  searchResults: ImmutableMap<string, any>
};

const SearchPersonPage = (props: Props) => {
  const { searchKey, onSearchKeyChange, findPersonByName, searchResults } = props;

  const isLoaded = searchResults.get('isLoaded');
  const isLoading = searchResults.get('isLoading');
  const results = searchResults.get('results');

  return (
    <Form>
      <FormGroup>
        <Label>Tên</Label>
        <Input
          type="text"
          placeholder="Tên"
          value={searchKey}
          onChange={(e: Object) => onSearchKeyChange(e.target.value)}
        />
      </FormGroup>
      <Button onClick={() => findPersonByName(searchKey)} color="primary">
        Tìm kiếm
      </Button>
      {isLoading && <Loader />}
    </Form>
  );
};

const mapStateToProps = (state: ImmutableMap<string, any>, { searchKey }: Props) => {
  const searchResults = selectPersonSearchResults(state, searchKey);

  return { searchResults };
};
const mapDispatchToProps = { findPersonByName };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPersonPage);
