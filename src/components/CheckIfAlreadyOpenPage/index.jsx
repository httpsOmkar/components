import React from 'react';
import { element } from 'prop-types';

/**
 * This component for reopening the same page in two or more tabs.
 * To avoid the token errors
 */
export default class CheckIfAlreadyOpenPage extends React.Component {
  static propTypes = {
    /**
     * Render children when the page is already open
     */
    errorChildren: element.isRequired,

    /**
     * Children when there is no error
     */
    children: element.isRequired,
  };

  static defaultProps = {
    errorChildren: null,
    children: null,
  };

  state = {
    ready: false,
    alreadyOpen: false,
  };

  componentDidMount() {
    if (localStorage && window) {
      localStorage.setItem('page_opened', Date.now().toString());
      const onLocalStorageEvent = event => {
        if (event.key === 'page_opened') {
          // Emit that you're already available.
          return localStorage.setItem('already_open', Date.now().toString());
        }

        if (event.key === 'already_open') {
          return this.setState({ alreadyOpen: true });
        }

        this.setState({ ready: true });
      };

      window.addEventListener('storage', onLocalStorageEvent, false);
    }
  }

  render() {
    const { alreadyOpen, ready } = this.state;
    const { errorChildren, children } = this.props;

    if (ready) {
      return alreadyOpen ? errorChildren : children;
    }

    return <></>;
  }
}
