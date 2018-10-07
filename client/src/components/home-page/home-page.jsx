import React from 'react';

import { wrapPersonConsumer } from 'contexts';

import MainLayout from '../layouts/main';

const HomePage = ({ personMap }) => <MainLayout>{personMap.get('1')}</MainLayout>;

export default wrapPersonConsumer(HomePage);
