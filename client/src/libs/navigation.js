import UrlPattern from 'url-pattern';

const personDetailUrl = new UrlPattern('/persons/:personId');
export const navigateToPersonDetailPage = (history, personId) =>
  history.push(personDetailUrl.stringify({ personId }));
