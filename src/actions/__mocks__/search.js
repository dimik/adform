import ActionTypes from 'constants/ActionTypes';

export const setSearchText = jest.fn()
  .mockImplementation((text = '') => ({
    type: ActionTypes.SET_SEARCH_TEXT,
    text,
  }));

export const removeAllFilters = jest.fn()
  .mockImplementation(() => ({ type: ActionTypes.REMOVE_ALL_SEARCH_FILTERS }));