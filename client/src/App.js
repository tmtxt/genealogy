import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import 'libs/moment';

import { wrapContextProviders } from './contexts';

import { MainLayoutRoute, FullWidthLayoutRoute, AdminLayoutRoute } from 'components/layouts';

import HomePage from 'components/page-home';
import PersonDetailPage from 'components/page-person-detail';
import PersonEditPage from 'components/page-person-edit';
import TreePage from 'components/page-tree';
import AddChildPage from 'components/page-add-child';
import LoginPage from 'components/page-login';
import ChangePasswordPage from 'components/page-change-password';
import EditPicturePage from 'components/page-edit-picture';
import EditChildrenOrderPage from 'components/page-edit-children-order';
import EditPrefacePage from 'components/page-edit-preface';

const AppWithRouter = () => (
  <Router>
    <Switch>
      <MainLayoutRoute exact path="/" component={HomePage} />
      <MainLayoutRoute exact path="/persons/:personId/edit" component={PersonEditPage} />
      <MainLayoutRoute exact path="/persons/:personId/edit-picture" component={EditPicturePage} />
      <MainLayoutRoute exact path="/persons/:personId" component={PersonDetailPage} />
      <MainLayoutRoute exact path="/persons/:personId/add-child" component={AddChildPage} />
      <MainLayoutRoute exact path="/login" component={LoginPage} />
      <MainLayoutRoute exact path="/change-password" component={ChangePasswordPage} />
      <MainLayoutRoute
        exact
        path="/persons/:personId/edit-children-order"
        component={EditChildrenOrderPage}
      />

      <FullWidthLayoutRoute exact path="/tree" component={TreePage} />
      <FullWidthLayoutRoute exact path="/persons/:personId/tree" component={TreePage} />

      <AdminLayoutRoute exact path="/admin/preface" component={EditPrefacePage} />
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
    <AppWithContextProviders />
  </AlertProvider>
);

export default App;
