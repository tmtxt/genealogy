import React from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { flowRight } from 'lodash';

import { wrapMainLayout } from 'components/layouts';
import { Loader } from 'components/shared';
import { navigateToPersonEditPage } from 'libs/navigation';

import PersonInfoTable from './person-info-table';
import ParentsTable from './parents-table';
import ChildrenTable from './children-table';
import MarriagesTable from './marriages-table';
import AddChildErrorDialog from './add-child-error-dialog';

import withDeleteDialogHandler from './with-delete-dialog-handler';

const PersonDetailPage = ({
  personId,
  person,
  history,
  addMarriage,
  isAddingMarriage,
  toggleAddChildDialog,
  showAddChildErrorDialog,
  addChild,
  deletePerson
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

  const isUpdating = !!isAddingMarriage;

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
            <Button disabled={isUpdating} onClick={() => addMarriage(personId)}>
              {addMarriageText}
            </Button>{' '}
            <Button disabled={isUpdating} onClick={() => addChild()}>
              Thêm con
            </Button>{' '}
            <Button color="danger" disabled={isUpdating} onClick={() => deletePerson()}>
              Xóa
            </Button>
            {isUpdating && <Loader />}
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
        <div className="col-md-3">
          <ParentsTable {...{ person }} />
          <MarriagesTable {...{ person }} />
          <ChildrenTable {...{ person }} />
        </div>
      </div>
      <AddChildErrorDialog isOpen={showAddChildErrorDialog} toggle={toggleAddChildDialog} />
    </div>
  );
};

const enhance = flowRight([wrapMainLayout, withRouter, withDeleteDialogHandler]);
export default enhance(PersonDetailPage);
