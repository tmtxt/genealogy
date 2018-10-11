import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'libs/moment';

import { wrapContextProviders } from './contexts';

import HomePage from 'components/page-home';
import PersonDetailPage from 'components/page-person-detail';
import TreePage from 'components/page-tree';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/persons/:personId" component={PersonDetailPage} />
      <Route path="/tree" component={TreePage} />
    </div>
  </Router>
);

export default wrapContextProviders(App);
