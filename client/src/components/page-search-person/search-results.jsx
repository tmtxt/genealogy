// @flow
import React, { Component } from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Map as ImmutableMap } from 'immutable';

import {
  navigateToPersonDetailPage,
  navigateToSearchPersonFromOtherPage,
  navigateToPersonRelationPage,
  personDetailUrl,
  searchPersonFromOtherUrl,
  personRelationUrl
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
    const { results, history, fromPersonId } = this.props;

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
                {!fromPersonId && (
                  <a
                    href={searchPersonFromOtherUrl.stringify({ fromPersonId: person.get('id') })}
                    onClick={(e: Object) => {
                      e.preventDefault();
                      navigateToSearchPersonFromOtherPage(history, person.get('id'));
                    }}
                  >
                    So sánh với người khác
                  </a>
                )}
                {fromPersonId &&
                  fromPersonId !== person.get('id').toString() && (
                    <a
                      href={personRelationUrl.stringify({
                        fromPersonId,
                        toPersonId: person.get('id')
                      })}
                      onClick={(e: Object) => {
                        e.preventDefault();
                        navigateToPersonRelationPage(history, fromPersonId, person.get('id'));
                      }}
                    >
                      So sánh
                    </a>
                  )}
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }
}

export default (withRouter(PersonSearchResults): Class<Component<ExportedProps>>);
