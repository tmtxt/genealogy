// @flow
import React, { Component } from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Map as ImmutableMap } from 'immutable';

import {
  navigateToPersonDetailPage,
  navigateToSearchPersonFromOtherPage,
  personDetailUrl,
  searchPersonFromOtherUrl
} from 'libs/navigation';

type ExportedProps = {
  results: ImmutableMap<string, any>,
  fromPersonId?: string
};
type Props = ExportedProps & {
  history: Object
};

class PersonSearchResults extends Component<Props> {
  render() {
    const { results, history } = this.props;

    return (
      <ListGroup flush>
        {results.map((person, idx) => (
          <ListGroupItem key={idx} tag="div">
            <Row>
              <Col md="6">
                <a
                  onClick={(e: Object) => {
                    e.preventDefault();
                    navigateToPersonDetailPage(history, person.get('id'));
                  }}
                  href={personDetailUrl.stringify({ personId: person.get('id') })}
                >
                  {person.get('name') || 'Không rõ'}
                </a>
              </Col>
              <Col md="6">
                <a
                  href={searchPersonFromOtherUrl.stringify({ fromPersonId: person.get('id') })}
                  onClick={(e: Object) => {
                    e.preventDefault();
                    navigateToSearchPersonFromOtherPage(history, person.get('id'));
                  }}
                >
                  So sánh với người khác
                </a>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }
}

export default (withRouter(PersonSearchResults): Class<Component<ExportedProps>>);
