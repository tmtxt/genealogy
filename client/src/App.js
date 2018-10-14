import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'libs/moment';

import { wrapContextProviders } from './contexts';

import HomePage from 'components/page-home';
import PersonDetailPage from 'components/page-person-detail';
import PersonEditPage from 'components/page-person-edit';
import TreePage from 'components/page-tree';
import AddChildPage from 'components/page-add-child';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/persons/:personId/edit" component={PersonEditPage} />
      <Route exact path="/persons/:personId" component={PersonDetailPage} />
      <Route exact path="/persons/:personId/add-child" component={AddChildPage} />
      <Route path="/tree" component={TreePage} />
    </div>
  </Router>
);

export default wrapContextProviders(App);
