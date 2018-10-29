import _ from 'lodash';

// provider
import { wrapApiProvider } from './api';
import { wrapPersonProvider } from './person';
import { wrapTreeProvider } from './tree';
import { wrapUserProvider } from './user';
import { wrapChildrenOrderProvider } from './children-order';
import { wrapContentProvider } from './content';

export const wrapContextProviders = _.flowRight([
  wrapApiProvider,
  wrapPersonProvider,
  wrapTreeProvider,
  wrapUserProvider,
  wrapChildrenOrderProvider,
  wrapContentProvider
]);

// consumer
export { wrapPersonConsumer } from './person';
export { wrapTreeConsumer } from './tree';
export { wrapUserConsumer } from './user';
export { wrapChildrenOrderConsumer } from './children-order';
export { wrapContentConsumer } from './content';
