import ActionTypes from 'constants/ActionTypes';

export function setFilter(filter) {
  return {
    type: ActionTypes.SET_SEARCH_FILTER,
    filter,
  }
}

export function removeFilter(name) {
  return {
    type: ActionTypes.REMOVE_SEARCH_FILTER,
    name,
  }
}

export function removeAllFilters() {
  return {
    type: ActionTypes.REMOVE_ALL_SEARCH_FILTERS,
  }
}

export function toggleFilter(name) {
  return {
    type: ActionTypes.TOGGLE_SEARCH_FILTER,
    name,
  }
}

export function setSearchText(text = '') {
  return {
    type: ActionTypes.SET_SEARCH_TEXT,
    text,
  }
}