import React from 'react';

import {PersonConsumer} from 'contexts';
import MainLayout from '../layouts/main';

const HomePage = () => (
  <MainLayout>
    <PersonConsumer>
      {
        ({ personMap }) => (
          <div>
            Hello {personMap.abc}
          </div>
        )
      }
    </PersonConsumer>
  </MainLayout>
);

export default HomePage;
