import ActionTypes from 'constants/ActionTypes';

export const toggleDrawer = jest.fn()
  .mockImplementation(() => ({ type: ActionTypes.TOGGLE_DRAWER }));