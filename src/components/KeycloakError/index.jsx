import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { KeycloakContext } from '../KeycloakWrapper';

/**
 * Render the Keycloak ERROR if there any
 */
export default class KeycloakError extends PureComponent {
  static propTypes = {
    /** The CSS class name of the wrapper element */
    className: string,
  };

  /**
   * Normalize the error into human readable string
   * @param error
   * @returns {String|null}
   */
  static normalizeError(error) {
    if (!error) {
      return null;
    }

    return error.message || error;
  }

  /**
   * Render the elements
   * @returns {*}
   */
  render() {
    return (
      <KeycloakContext.Consumer>
        {({ error }) => (
          <div className={this.props.className || ''}>
            {KeycloakError.normalizeError(error)}
          </div>
        )}
      </KeycloakContext.Consumer>
    );
  }
}
