import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ContextWrapper from './contexts';

import HomePage from 'components/home-page';
import PersonDetailPage from 'components/person-detail-page';

const App = () => (
  <ContextWrapper>
    <Router>
      <div>
        <Route exact path="/" component={HomePage} />
        <Route path="/persons/:personId" component={PersonDetailPage} />
      </div>
    </Router>
  </ContextWrapper>
);

export default App;
