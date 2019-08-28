jest.mock('actions/search');

import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { setSearchText } from 'actions/search';
import SearchTextContainer from '..';
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

  it('should call setSearchText', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SearchTextContainer />
      </Provider>
    );

    wrapper.find('input').simulate('change', { target: { value: 'test' } });
    expect(setSearchText).toBeCalledWith('test');
  });
});