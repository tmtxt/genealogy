// @flow
import React from 'react';
import {
  Button,
  Card,
  CardText,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';
import { connect } from 'react-redux';
import { Map as ImmutableMap } from 'immutable';

import { findPersonByName } from 'store/actions/person';
import { selectPersonSearchResults } from 'store/selectors/person-search-results';
import Loader from 'components/shared/loader';
import { withRouter } from 'react-router-dom';

import PersonSearchResults from './search-results';

type ExportedProps = {
  searchKey: string,
  onSearchKeyChange: string => void,
  fromPersonId?: string
};
type Props = ExportedProps & {
  findPersonByName: typeof findPersonByName,
  searchResults: ImmutableMap<string, any>,
  history: Object
};

const SearchPersonPage = (props: Props) => {
  const { searchKey, onSearchKeyChange, findPersonByName, searchResults, fromPersonId } = props;

  const isLoaded = searchResults.get('isLoaded');
  const isLoading = searchResults.get('isLoading');
  const results = searchResults.get('results');
  const isNotFound = isLoaded && !results.size;
  const isFound = isLoaded && !!results.size;

  return (
    <div>
      <Row>
        <Col>
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
          </Form>
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col>
          {isLoading && <Loader />}
          {isNotFound && (
            <Card body outline color="danger">
              <CardText>Không tìm thấy</CardText>
            </Card>
          )}
          {isFound && <PersonSearchResults {...{ results, fromPersonId }} />}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state: ImmutableMap<string, any>, { searchKey }: ExportedProps) => {
  const searchResults = selectPersonSearchResults(state, searchKey);

  return { searchResults };
};
const mapDispatchToProps = { findPersonByName };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchPersonPage));
