// External dependencies
import '~mapbox-gl/dist/mapbox-gl.css';
import { NavigationControl } from 'react-map-gl';
import React from 'react';

/**
 * Higher Order Component that configures Trustroots map layers:
 * - Adds Mapbox API token
 * - Adds Navigation control
 */
const withMapControls = (WrappedComponent) => {
  const publicKey = window?.settings?.mapbox?.publicKey;

  if (!publicKey) {
    return (
      <div>You must configure Mapbox <code>publicKey</code> for maps to work.</div>
    );
  }

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
};

withMapControls.propTypes = {};

export default withMapControls;
