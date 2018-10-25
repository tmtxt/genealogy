import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import 'libs/moment';

import { wrapContextProviders } from './contexts';

import { MainLayout } from 'components/layouts';

import HomePage from 'components/page-home';
import PersonDetailPage from 'components/page-person-detail';
import PersonEditPage from 'components/page-person-edit';
import TreePage from 'components/page-tree';
import AddChildPage from 'components/page-add-child';
import LoginPage from 'components/page-login';
import ChangePasswordPage from 'components/page-change-password';
import EditPicturePage from 'components/page-edit-picture';

const AppWithRouter = () => (
  <Router>
    <MainLayout>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/persons/:personId/edit" component={PersonEditPage} />
      <Route exact path="/persons/:personId/edit-picture" component={EditPicturePage} />
      <Route exact path="/persons/:personId" component={PersonDetailPage} />
      <Route exact path="/persons/:personId/add-child" component={AddChildPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/change-password" component={ChangePasswordPage} />
      <Route exact path="/tree" component={TreePage} />
      <Route exact path="/persons/:personId/tree" component={TreePage} />

    </MainLayout>
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
