import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { SearchText } from '..';

describe('SearchText', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render an input', () => {
    const wrapper = shallow(<SearchText />);

    expect(wrapper.find(InputBase).exists()).toBe(true);
  });

  it('should render SearchIcon', () => {
    const wrapper = shallow(<SearchText />);

    expect(wrapper.contains(<SearchIcon />)).toBe(true);
  });
});