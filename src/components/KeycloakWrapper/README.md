```js
const KeycloakInstance = require('../../utils/keycloak-mock-instance').default;

const kc = new KeycloakInstance();

<KeycloakWrapper keycloak={kc} keycloakOptions={ {  } } tokenUpdateInterval={100}>
  <p>I am protected</p>
</KeycloakWrapper>

```

### Failing error

```js
const KeycloakInstance = require('../../utils/keycloak-mock-instance').default;

const kc = new KeycloakInstance();
kc.isError = true;
<KeycloakWrapper keycloak={kc} keycloakOptions={ {  } } tokenUpdateInterval={100}>
  <p>I am protected</p>
</KeycloakWrapper>

```
