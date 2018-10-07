import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { wrapContextProviders } from './contexts';

import HomePage from 'components/home-page';
import PersonDetailPage from 'components/person-detail-page';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/persons/:personId" component={PersonDetailPage} />
    </div>
  </Router>
);

export default wrapContextProviders(App);
