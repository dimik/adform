import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Toolbar from '@material-ui/core/Toolbar';
import FilterListIcon from '@material-ui/icons/FilterList';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { TableToolbar } from '..';

describe('TableToolbar', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render a Toolbar', () => {
    const wrapper = shallow(<TableToolbar />);

    expect(wrapper.is(Toolbar)).toBe(true);
  });

  it('should render filters button', () => {
    const wrapper = shallow(<TableToolbar />);

    expect(wrapper.find(FilterListIcon).parent().is(IconButton)).toBe(true);
  });

  it('should render filters menu', () => {
    const wrapper = shallow(<TableToolbar />);

    expect(wrapper.find(MoreVertIcon).parent().is(IconButton)).toBe(true);
    expect(wrapper.find(MenuItem).parent().is(Menu)).toBe(true);
  });
});