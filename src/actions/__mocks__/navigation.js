export const toggleDrawer = jest.fn()
  .mockImplementation(() => ({ type: 'TOGGLE_DRAWER' }));