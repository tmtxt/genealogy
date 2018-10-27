import _ from 'lodash';

// provider
import { wrapApiProvider } from './api';
import { wrapPersonProvider } from './person';
import { wrapTreeProvider } from './tree';
import { wrapUserProvider } from './user';
import { wrapChildrenOrderProvider } from './children-order';
export const wrapContextProviders = _.flowRight([
  wrapApiProvider,
  wrapPersonProvider,
  wrapTreeProvider,
  wrapUserProvider,
  wrapChildrenOrderProvider
]);

// consumer
export { wrapPersonConsumer } from './person';
export { wrapTreeConsumer } from './tree';
export { wrapUserConsumer } from './user';
export { wrapChildrenOrderConsumer } from './children-order';
