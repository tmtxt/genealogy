import React from 'react';
import { flowRight } from 'lodash';

import { wrapPersonConsumer } from 'contexts';
import { wrapMainLayout } from 'components/layouts';

const HomePage = ({ personMap }) => <div>hello</div>;

const hoc = flowRight([wrapMainLayout, wrapPersonConsumer]);
export default hoc(HomePage);
