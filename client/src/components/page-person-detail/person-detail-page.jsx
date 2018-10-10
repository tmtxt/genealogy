import React, { Component } from 'react';

import { wrapMainLayout } from 'components/layouts';
import { Loader } from 'components/shared';

import PersonInfoTable from './person-info-table';

class PersonDetailPage extends Component {
  render() {
    const { person } = this.props;

    if (!person) {
      return (
        <div className="center-block">
          <Loader />
        </div>
      );
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <img className="img-responsive img-rounded" alt="" src={person.get('picture')} />
          </div>
          <div className="col-md-6">
            <h1>{person.get('name')}</h1>
            <PersonInfoTable {...{ person }} />
          </div>
          <div className="col-md-3">Hello</div>
        </div>
      </div>
    );
  }
}

export default wrapMainLayout(PersonDetailPage);
