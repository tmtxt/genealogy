import _ from 'lodash';

// provider
import { wrapApiProvider } from './api';
import { wrapPersonProvider } from './person';
import { wrapTreeProvider } from './tree';
export const wrapContextProviders = _.flowRight([
  wrapApiProvider,
  wrapPersonProvider,
  wrapTreeProvider
]);

// consumer
export { wrapPersonConsumer } from './person';
export { wrapTreeConsumer } from './tree';
