export const setSearchText = jest.fn()
  .mockImplementation((text = '') => ({
    type: 'SET_SEARCH_TEXT',
    text,
  }));

export const removeAllFilters = jest.fn()
  .mockImplementation(() => ({ type: 'REMOVE_ALL_SEARCH_FILTERS' }));