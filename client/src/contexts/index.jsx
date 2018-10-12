import _ from 'lodash';

// provider
import { wrapPersonProvider } from './person';
import { wrapTreeProvider } from './tree';
export const wrapContextProviders = _.flowRight([wrapPersonProvider, wrapTreeProvider]);

// consumer
export { wrapPersonConsumer } from './person';
export { wrapTreeConsumer } from './tree';
