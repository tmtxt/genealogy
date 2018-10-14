import UrlPattern from 'url-pattern';

export const personDetailUrl = new UrlPattern('/persons/:personId');
export const navigateToPersonDetailPage = (history, personId) =>
  history.push(personDetailUrl.stringify({ personId }));

export const personEditUrl = new UrlPattern('/persons/:personId/edit');
export const navigateToPersonEditPage = (history, personId) =>
  history.push(personEditUrl.stringify({ personId }));

export const addChildUrl = new UrlPattern('/persons/:personId/add-child');
export const navigateToAddChildPage = (history, personId) =>
  history.push(addChildUrl.stringify({ personId }));
