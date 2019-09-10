// External dependencies
import { NavigationControl } from 'react-map-gl';
import get from 'lodash/get';
import React, { Component } from 'react';


/**
 * Higher Order Component that configures Trustroots map layers:
 * - Adds Mapbox API token
 * - Adds Navigation control
 */
const withMapControls = (WrappedComponent) => {
  // @TODO: what's up with this?
  // eslint-disable-next-line react/display-name
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        config: get(window, ['settings', 'mapbox'], {})
      };
    }

    render() {
      const { config } = this.state;
      const { publicKey } = config;

      if (!publicKey) {
        return <div>You must configure Mapbox <code>publicKey</code> for maps to work.</div>;
      }

      // style="mapbox://styles/mapbox/streets-v9"
      // https://uber.github.io/react-map-gl/#/Documentation/api-reference/interactive-map
      return (
        <WrappedComponent
          dragRotate={false}
          mapboxApiAccessToken={publicKey}
          touchRotate={false}
          {...this.props}
        >
          <div className="map-navigation-control-container">
            <NavigationControl showCompass={false} />
          </div>
          {this.children}
        </WrappedComponent>
      );
    }
  };
};

withMapControls.propTypes = {};

/*
withMapControls.defaultProps = {
  height: 320,
  width: '100%',
};
*/

export default withMapControls;
