
import React from 'react';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { flowRight } from 'lodash';
import { Helmet } from 'react-helmet';

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
      <Helmet>
        <title>{person.getDisplayName()}</title>
      </Helmet>
      <div className="row" style={{ marginBottom: 10 }}>
        <div className="col-md-12">
          {isLoggedIn() && (
            <UncontrolledButtonDropdown>
              <DropdownToggle caret color="primary">
                Chỉnh Sửa
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => navigateToPictureEditPage(history, personId)}
                  disabled={isUpdating}
                >
                  Sửa ảnh
                </DropdownItem>
                <DropdownItem
                  onClick={() => navigateToPersonEditPage(history, personId)}
                  disabled={isUpdating}
                >
                  Sửa thông tin
                </DropdownItem>
                <DropdownItem onClick={addMarriage} disabled={isUpdating}>
                  {addMarriageText}
                </DropdownItem>
                <DropdownItem onClick={addChild} disabled={isUpdating}>
                  Thêm con
                </DropdownItem>
                <DropdownItem onClick={deletePerson} disabled={isUpdating}>
                  Xóa
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          )}{' '}
          <Button onClick={() => navigateToPersonTreePage(history, personId)} disabled={isUpdating}>
            Cây gia phả
          </Button>
          {isUpdating && <Loader />}
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
          <ChildrenTable {...{ personId, person, isLoggedIn }} />
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
