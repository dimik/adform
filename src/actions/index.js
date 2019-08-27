export function openDrawer() {
  return dispatch => {
    dispatch({ type: 'OPEN_DRAWER' })
  }
}

export function closeDrawer() {
  return dispatch => {
    dispatch({ type: 'CLOSE_DRAWER' })
  }
}

export function toggleDrawer() {
  return dispatch => {
    dispatch({ type: 'TOGGLE_DRAWER' })
  }
}