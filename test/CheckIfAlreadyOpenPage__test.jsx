import React from 'react';
import { mount } from 'enzyme';
import CheckIfAlreadyOpenPage from '../src/components/CheckIfAlreadyOpenPage';

describe('<CheckIfAlreadyOpen />', () => {
  it('should render', () => {
    const component = mount(
      <CheckIfAlreadyOpenPage errorChildren={<p>Error</p>}>
        <p>Test</p>
      </CheckIfAlreadyOpenPage>
    );

    expect(component).toMatchSnapshot();
  });
});
