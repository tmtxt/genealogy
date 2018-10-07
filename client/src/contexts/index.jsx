import _ from 'lodash';

// provider
import { wrapPersonProvider } from './person';
export const wrapContextProviders = _.flowRight([wrapPersonProvider]);

// consumer
export { wrapPersonConsumer } from './person';
