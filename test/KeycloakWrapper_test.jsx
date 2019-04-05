import React from 'react';
import { mount } from 'enzyme';
import KeycloakWrapper from '../src/components/KeycloakWrapper';
import KeycloakMockInstance from '../src/utils/keycloak-mock-instance';

describe('<KeycloakWrapper />', () => {
  it('should render correctly', () => {
    const kc = new KeycloakMockInstance();
    const wrapper = mount(
      <KeycloakWrapper
        keycloak={kc}
        keycloakOptions={{}}
        tokenUpdateInterval={50}>
        <p>Testing</p>
      </KeycloakWrapper>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
