import UrlPattern from 'url-pattern';

const personDetailUrl = new UrlPattern('/persons/:personId');
export const navigateToPersonDetailPage = (history, personId) =>
  history.push(personDetailUrl.stringify({ personId }));

const personEditUrl = new UrlPattern('/persons/:personId/edit');
export const navigateToPersonEditPage = (history, personId) =>
  history.push(personEditUrl.stringify({ personId }));
