import UrlPattern from 'url-pattern';

export const personDetailUrl = new UrlPattern('/persons/:personId');
export const navigateToPersonDetailPage = (history, personId) =>
  history.push(personDetailUrl.stringify({ personId }));

export const personEditUrl = new UrlPattern('/persons/:personId/edit');
export const navigateToPersonEditPage = (history, personId) =>
  history.push(personEditUrl.stringify({ personId }));

export const editChildrenOrderUrl = new UrlPattern('/persons/:personId/edit-children-order');
export const navigateToEditChildrenOrderPage = (history, personId) =>
  history.push(editChildrenOrderUrl.stringify({ personId }));

export const addChildUrl = new UrlPattern('/persons/:personId/add-child');
export const navigateToAddChildPage = (history, personId) =>
  history.push(addChildUrl.stringify({ personId }));

export const editPictureUrl = new UrlPattern('/persons/:personId/edit-picture');
export const navigateToPictureEditPage = (history, personId) =>
  history.push(editPictureUrl.stringify({ personId }));

export const treeUrl = new UrlPattern('/tree');
export const navigateToTreePage = history => history.push(treeUrl.stringify());

export const personTreeUrl = new UrlPattern('/persons/:personId/tree');
export const navigateToPersonTreePage = (history, personId) =>
  history.push(personTreeUrl.stringify({ personId }));

export const navigateToHomePage = history => history.push('/');

export const navigateToLoginPage = history => history.push('/login');

export const navigateToAdminIndexPage = history => history.push('/admin');
export const navigateToChangePasswordPage = history => history.push('/change-password');
export const navigateToEditPrefacePage = history => history.push('/admin/preface');
export const navigateToEditGeneralInfoPage = history => history.push('/admin/general-info');
export const navigateToEditHistoryPage = history => history.push('/admin/history');

export const navigateToHistoryPage = history => history.push('/history');
