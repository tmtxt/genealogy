import React from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { flowRight } from 'lodash';

import { wrapMainLayout } from 'components/layouts';
import { Loader } from 'components/shared';
import { navigateToPersonEditPage } from 'libs/navigation';
import { withPersonDataFromParam } from 'components/person';

import PersonInfoTable from './person-info-table';
import ParentsTable from './parents-table';
import ChildrenTable from './children-table';
import MarriagesTable from './marriages-table';

import withDeleteDialogHandler from './with-delete-dialog-handler';
import withAddChildDialogHandler from './with-add-child-dialog-handler';
import withAddMarriageHandler from './with-add-marriage-handler';

const PersonDetailPage = ({
  personId,
  person,
  history,
  // for adding marriage
  addMarriage,
  isAddingMarriage,
  // for adding child
  addChild,
  // for deleting
  deletePerson,
  isDeleting
}) => {
  if (!person) {
    return (
      <div className="center-block">
        <Loader />
      </div>
    );
  }

  const gender = person.get('gender');
  const addMarriageText = gender === 'male' ? 'Thêm vợ' : 'Thêm chồng';

  const isUpdating = !!isAddingMarriage || !!isDeleting;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3" />
        <div className="col-md-6">
          <div className="float-right">
            <Button
              color="primary"
              onClick={() => navigateToPersonEditPage(history, personId)}
              disabled={isUpdating}
            >
              Sửa thông tin
            </Button>{' '}
            <Button disabled={isUpdating} onClick={addMarriage}>
              {addMarriageText}
            </Button>{' '}
            <Button disabled={isUpdating} onClick={addChild}>
              Thêm con
            </Button>{' '}
            <Button color="danger" disabled={isUpdating} onClick={deletePerson}>
              Xóa
            </Button>
            {isUpdating && <Loader />}
          </div>
        </div>
        <div className="col-md-3" />
      </div>
      <div className="row">
        <div className="col-md-3">
          <img className="img-responsive img-rounded" alt="" src={person.getPictureUrl()} />
        </div>
        <div className="col-md-6">
          <h1>{person.get('name')}</h1>
          <PersonInfoTable {...{ person }} />
        </div>
        <div className="col-md-3">
          <ParentsTable {...{ person }} />
          <MarriagesTable {...{ person }} />
          <ChildrenTable {...{ person }} />
        </div>
      </div>
    </div>
  );
};

const enhance = flowRight([
  withPersonDataFromParam,
  wrapMainLayout,
  withRouter,
  withDeleteDialogHandler,
  withAddChildDialogHandler,
  withAddMarriageHandler
]);
export default enhance(PersonDetailPage);
