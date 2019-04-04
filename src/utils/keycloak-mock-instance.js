/**
 * Mock implementation for real keycloak
 */
export default class KeycloakMockInstance {
  isError = false;

  init() {
    return this;
  }

  loadUserProfile() {
    return this;
  }

  updateToken() {
    return this;
  }

  success(callback) {
    if (!this.isError) {
      callback(true);
    }

    return this;
  }

  error(callback) {
    if (this.isError) {
      callback(new Error('Im mock error'));
    }

    return this;
  }
}
