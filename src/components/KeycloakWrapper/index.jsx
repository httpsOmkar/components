import React, { Component } from 'react';
import { string, element, any, object, number } from 'prop-types';
import KeycloakError from '../KeycloakError';

export const KeycloakContext = React.createContext();

/**
 * Render children when authenticated with the keycloak.
 */
export default class KeycloakWrapper extends Component {
  static propTypes = {
    /** The CSS class name of the wrapper element */
    className: string,

    /**
     * Element which will render when the keycloak is initializing
     */
    loadingElement: element.isRequired,

    /**
     * Child element to render
     */
    children: element.isRequired,

    /**
     * Keycloak instance
     */
    keycloak: any.isRequired,

    /**
     * Options for keycloak
     */
    keycloakOptions: object.isRequired,

    /**
     * Render when any error is there
     */
    errorChildren: element,

    /**
     * Update token in this interval
     */
    tokenUpdateInterval: number.isRequired,
  };

  static defaultProps = {
    className: null,
    loadingElement: <p>Loading...</p>,
    children: null,
    keycloak: null,
    tokenUpdateInterval: null,
    errorChildren: null,
  };

  state = {
    keycloakPromise: null,
    error: null,
  };

  /**
   * @private
   * Interval id
   */
  refreshIntervalId;

  /**
   * @private
   * Keycloak promise
   * @returns {Promise<any>}
   */
  keycloakPromise() {
    const { keycloak } = this.props;

    return new Promise((resolve, reject) => {
      // Call the init keycloak
      keycloak
        .init(this.props.keycloakOptions)
        .success(authenticated => {
          if (authenticated) {
            // Update the token in specific time
            this.refreshIntervalId = setInterval(() => {
              keycloak.updateToken(0).error(err => {
                if (err) {
                  // eslint-disable-next-line
                  this.setState({ error: err });
                }
              });
            }, this.props.tokenUpdateInterval);
            resolve(authenticated);
          } else {
            keycloak.login();
          }
        })
        .error(reject);
    });
  }

  /**
   * @private
   * Load the keycloak profile
   * @returns {Promise<any>}
   */
  keycloakProfilePromise() {
    const { keycloak } = this.props;

    return new Promise((resolve, reject) => {
      keycloak
        .loadUserProfile()
        .success(resolve)
        .error(reject);
    });
  }

  componentDidMount() {
    this.keycloakPromise()
      .then(docs => {
        this.setState({ keycloakPromise: docs });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  componentWillUnmount() {
    // Clear the interval if exits
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId);
    }
  }

  /**
   * Render the element
   * @returns {*}
   */
  render() {
    const { keycloakPromise, error } = this.state;
    const { children, errorChildren } = this.props;
    const ErrorChild = errorChildren || KeycloakError;

    return (
      <KeycloakContext.Provider value={this.state}>
        <>
          {!error && <>{keycloakPromise && children}</>}
          {error && <ErrorChild />}
        </>
      </KeycloakContext.Provider>
    );
  }
}
