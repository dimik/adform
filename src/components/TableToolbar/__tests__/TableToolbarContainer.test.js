jest.mock('actions/navigation');
jest.mock('actions/search');

import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { toggleDrawer } from 'actions/navigation';
import { removeAllFilters } from 'actions/search';
import MenuItem from '@material-ui/core/MenuItem';
import FilterListIcon from '@material-ui/icons/FilterList';
import TableToolbarContainer from '..';
import { Provider } from 'react-redux';
import store from 'store';

describe('SearchTextConatiner', () => {
  let mount;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it('should call toggleDrawer', () => {
    const wrapper = mount(
      <Provider store={store}>
        <TableToolbarContainer />
      </Provider>
    );

    wrapper.find(FilterListIcon).simulate('click');
    expect(toggleDrawer).toBeCalled();
  });

  it('should call removeAllFilters', () => {
    const wrapper = mount(
      <Provider store={store}>
        <TableToolbarContainer />
      </Provider>
    );

    wrapper.find(MenuItem).simulate('click');
    expect(removeAllFilters).toBeCalled();
  });
});