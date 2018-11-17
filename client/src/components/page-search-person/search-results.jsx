// @flow
import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Map as ImmutableMap } from 'immutable';

import { navigateToPersonDetailPage, personDetailUrl } from 'libs/navigation';

type ExportedProps = {
  results: ImmutableMap<string, any>
};
type Props = ExportedProps & {
  history: Object
};

class PersonSearchResults extends Component<Props> {
  render() {
    const { results, history } = this.props;

    return (
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
    );
  }
}

export default (withRouter(PersonSearchResults): Class<Component<ExportedProps>>);
