import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import 'libs/moment';

import { wrapContextProviders } from './contexts';

import HomePage from 'components/page-home';
import PersonDetailPage from 'components/page-person-detail';
import PersonEditPage from 'components/page-person-edit';
import TreePage from 'components/page-tree';
import AddChildPage from 'components/page-add-child';

const App = () => (
  <AlertProvider
    template={AlertTemplate}
    position="bottom center"
    timeout={5000}
    offset="30px"
    transition="scale"
  >
    <Router>
      <div>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/persons/:personId/edit" component={PersonEditPage} />
        <Route exact path="/persons/:personId" component={PersonDetailPage} />
        <Route exact path="/persons/:personId/add-child" component={AddChildPage} />
        <Route path="/tree" component={TreePage} />
      </div>
    </Router>
  </AlertProvider>
);

export default wrapContextProviders(App);
