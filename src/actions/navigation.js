export function openDrawer() {
  return { type: 'OPEN_DRAWER' };
}

export function closeDrawer() {
  return { type: 'CLOSE_DRAWER' };
}

export function toggleDrawer() {
  return { type: 'TOGGLE_DRAWER' };
}

export function setToolbarTitle(title = '') {
  return {
    type: 'SET_TOOLBAR_TITLE',
    title,
  }
}