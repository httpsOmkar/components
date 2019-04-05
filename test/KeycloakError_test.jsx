import React from 'react';
import { mount } from 'enzyme';
import KeycloakError from '../src/components/KeycloakError';
import { KeycloakContext } from '../src/components/KeycloakWrapper';

describe('<KeycloakWrapper />', () => {
  it('should render correctly', () => {
    const error = mount(
      <KeycloakContext.Provider value={{ error: 'Something went wrong' }}>
        <KeycloakError />
      </KeycloakContext.Provider>
    );

    expect(error).toMatchSnapshot();
  });

  it('should render not render when no error', () => {
    const error = mount(
      <KeycloakContext.Provider value={{ error: null }}>
        <KeycloakError />
      </KeycloakContext.Provider>
    );

    expect(error).toMatchSnapshot();
  });
});
