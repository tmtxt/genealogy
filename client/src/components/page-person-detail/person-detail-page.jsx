import React from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { flowRight } from 'lodash';

import { wrapMainLayout } from 'components/layouts';
import { Loader } from 'components/shared';
import { navigateToPersonEditPage } from 'libs/navigation';

import PersonInfoTable from './person-info-table';

const PersonDetailPage = ({ personId, person, history }) => {
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
        <div className="col-md-3" />
        <div className="col-md-6">
          <div class="float-right">
            <Button color="primary" onClick={() => navigateToPersonEditPage(history, personId)}>
              Sửa thông tin
            </Button>
          </div>
        </div>
        <div className="col-md-3" />
      </div>
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
};

const enhance = flowRight([wrapMainLayout, withRouter]);
export default enhance(PersonDetailPage);

const styles = {
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
};
