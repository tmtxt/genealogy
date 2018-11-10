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
  ListGroup,
  ListGroupItem,
  Row
} from 'reactstrap';
import { connect } from 'react-redux';
import { Map as ImmutableMap } from 'immutable';

import { findPersonByName } from 'store/actions/person';
import { selectPersonSearchResults } from 'store/selectors/person-search-results';
import Loader from 'components/shared/loader';
import { personDetailUrl, navigateToPersonDetailPage } from 'libs/navigation';
import { withRouter } from 'react-router-dom';

type Props = {
  searchKey: string,
  onSearchKeyChange: string => void,
  findPersonByName: typeof findPersonByName,
  searchResults: ImmutableMap<string, any>,
  history: Object
};

const SearchPersonPage = (props: Props) => {
  const { searchKey, onSearchKeyChange, findPersonByName, searchResults, history } = props;

  const isLoaded = searchResults.get('isLoaded');
  const isLoading = searchResults.get('isLoading');
  const results = searchResults.get('results');

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
          {isLoaded &&
            !results.size && (
              <Card body outline color="danger">
                <CardText>Không tìm thấy</CardText>
              </Card>
            )}
          {isLoaded &&
            !!results.size && (
              <ListGroup flush>
                {results.map(person => (
                  <ListGroupItem
                    tag="a"
                    href={personDetailUrl.stringify({ personId: person.get('id') })}
                    onClick={(e: Object) => {
                      e.preventDefault();
                      navigateToPersonDetailPage(history, person.get('id'));
                    }}
                  >
                    {person.get('name') || 'Không rõ'}
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
        </Col>
      </Row>
    </div>
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
)(withRouter(SearchPersonPage));
