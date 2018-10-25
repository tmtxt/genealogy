import React from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { flowRight } from 'lodash';

import { Loader } from 'components/shared';
import {
  navigateToPersonEditPage,
  navigateToPictureEditPage,
  navigateToPersonTreePage
} from 'libs/navigation';
import { withPersonDataFromParam } from 'components/person';
import { wrapUserConsumer } from 'contexts';

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
  isDeleting,
  userSelectors: { isLoggedIn }
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
      <div className="row" style={{ marginBottom: 10 }}>
        <div className="col-md-3">
          {isLoggedIn() && (
            <div className="float-right">
              <Button
                onClick={() => navigateToPictureEditPage(history, personId)}
                disabled={isUpdating}
              >
                Sửa ảnh
              </Button>{' '}
              {isUpdating && <Loader />}
            </div>
          )}
        </div>
        <div className="col-md-6">
          {isLoggedIn() && (
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
          )}
        </div>
        <div className="col-md-3">
          {isLoggedIn() && (
            <div className="float-right">
              <Button
                onClick={() => navigateToPersonTreePage(history, personId)}
                disabled={isUpdating}
              >
                Cây gia phả
              </Button>{' '}
              {isUpdating && <Loader />}
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <img className="img-fluid img-thumbnail" alt="" src={person.getPictureUrl()} />
        </div>
        <div className="col-md-6">
          <h1>{person.getDisplayName()}</h1>
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
  wrapUserConsumer,
  withPersonDataFromParam,
  withRouter,
  withDeleteDialogHandler,
  withAddChildDialogHandler,
  withAddMarriageHandler
]);
export default enhance(PersonDetailPage);
