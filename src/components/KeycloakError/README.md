```js
const { KeycloakContext } = require('../KeycloakWrapper');

<>
    <KeycloakContext.Provider value={{ error: 'Something went wrong' }}>
      <KeycloakError/>
    </KeycloakContext.Provider>
    <KeycloakContext.Provider value={{ error: new Error('This is error occurred in keycloak') }}>
      <KeycloakError/>
    </KeycloakContext.Provider>
</>

```
