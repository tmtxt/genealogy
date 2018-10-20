import _ from 'lodash';

// provider
import { wrapApiProvider } from './api';
import { wrapPersonProvider } from './person';
import { wrapTreeProvider } from './tree';
import { wrapUserProvider } from './user';
export const wrapContextProviders = _.flowRight([
  wrapApiProvider,
  wrapPersonProvider,
  wrapTreeProvider,
  wrapUserProvider
]);

// consumer
export { wrapPersonConsumer } from './person';
export { wrapTreeConsumer } from './tree';
export { wrapUserConsumer } from './user';
