export function setFilter(filter) {
  return {
    type: 'SET_SEARCH_FILTER',
    filter,
  }
}

export function removeFilter(name) {
  return {
    type: 'REMOVE_SEARCH_FILTER',
    name,
  }
}

export function removeAllFilters() {
  return {
    type: 'REMOVE_ALL_SEARCH_FILTERS',
  }
}

export function toggleFilter(name) {
  return {
    type: 'TOGGLE_SEARCH_FILTER',
    name,
  }
}

export function setSearchText(text = '') {
  return {
    type: 'SET_SEARCH_TEXT',
    text,
  }
}