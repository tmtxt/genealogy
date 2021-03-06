import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Provider as ReduxProvider } from 'react-redux';
import { Helmet } from 'react-helmet';
import _ from 'lodash';

import 'libs/moment';

import { wrapContextProviders } from './contexts';

import { MainLayoutRoute, FullWidthLayoutRoute, AdminLayoutRoute } from 'components/layouts';
import store from 'store/store';

import HomePage from 'components/page-home';
import PersonDetailPage from 'components/page-person-detail';
import PersonEditPage from 'components/page-person-edit';
import TreePage from 'components/page-tree';
import HistoryPage from 'components/page-history';
import AddChildPage from 'components/page-add-child';
import LoginPage from 'components/page-login';
import ChangePasswordPage from 'components/page-change-password';
import EditPicturePage from 'components/page-edit-picture';
import EditChildrenOrderPage from 'components/page-edit-children-order';
import AdminIndexPage from 'components/page-admin-index';
import EditPrefacePage from 'components/page-edit-preface';
import EditGeneralInfoPage from 'components/page-edit-general-info';
import EditHistoryPage from 'components/page-edit-history';
import PersonsRelationPage from 'components/page-persons-relation';
import SearchPersonPage from 'components/page-search-person';

const AppWithRouter = () => (
  <Router>
    <Switch>
      <MainLayoutRoute exact path="/" component={HomePage} />
      <MainLayoutRoute exact path="/persons/:personId/edit" component={PersonEditPage} />
      <MainLayoutRoute exact path="/persons/:personId/edit-picture" component={EditPicturePage} />
      <MainLayoutRoute exact path="/persons/:personId" component={PersonDetailPage} />
      <MainLayoutRoute exact path="/persons/:personId/add-child" component={AddChildPage} />
      <MainLayoutRoute
        exact
        path="/persons/:personId/edit-children-order"
        component={EditChildrenOrderPage}
      />
      <MainLayoutRoute exact path="/login" component={LoginPage} />
      <MainLayoutRoute exact path="/change-password" component={ChangePasswordPage} />
      <MainLayoutRoute exact path="/history" component={HistoryPage} />

      <FullWidthLayoutRoute exact path="/tree" component={TreePage} />
      <FullWidthLayoutRoute exact path="/persons/:personId/tree" component={TreePage} />
      <FullWidthLayoutRoute
        exact
        path="/relationship/from/:fromPersonId/to/:toPersonId"
        component={PersonsRelationPage}
      />

      <AdminLayoutRoute exact path="/admin/search-person" component={SearchPersonPage} />
      <AdminLayoutRoute
        exact
        path="/admin/search-person/from-person/:fromPersonId"
        component={SearchPersonPage}
      />
      <AdminLayoutRoute exact path="/admin" component={AdminIndexPage} />
      <AdminLayoutRoute exact path="/admin/preface" component={EditPrefacePage} />
      <AdminLayoutRoute exact path="/admin/general-info" component={EditGeneralInfoPage} />
      <AdminLayoutRoute exact path="/admin/history" component={EditHistoryPage} />
    </Switch>
  </Router>
);

const AppWithContextProviders = wrapContextProviders(AppWithRouter);

const App = () => (
  <AlertProvider
    template={AlertTemplate}
    position="bottom center"
    timeout={5000}
    offset="30px"
    transition="scale"
  >
    <Helmet>
      <title>{_.get(window, ['__SERVER_DATA__', 'pageTitle'], 'Trần Văn Gia Phả')}</title>
    </Helmet>
    <ReduxProvider store={store}>
      <AppWithContextProviders />
    </ReduxProvider>
  </AlertProvider>
);

export default App;
