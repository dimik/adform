export const setSearchText = jest.fn()
  .mockImplementation((text = '') => ({
    type: 'SET_SEARCH_TEXT',
    text,
  }));