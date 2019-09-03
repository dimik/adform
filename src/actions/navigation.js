import ActionTypes from 'constants/ActionTypes';

export function openDrawer() {
  return { type: ActionTypes.OPEN_DRAWER };
}

export function closeDrawer() {
  return { type: ActionTypes.CLOSE_DRAWER };
}

export function toggleDrawer() {
  return { type: ActionTypes.TOGGLE_DRAWER };
}

export function setToolbarTitle(title = '') {
  return {
    type: ActionTypes.SET_TOOLBAR_TITLE,
    title,
  }
}