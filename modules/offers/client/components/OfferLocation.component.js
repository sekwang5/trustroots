// External dependencies
import { Marker } from 'react-map-gl';
import PropTypes from 'prop-types';
import React from 'react';
import ReactMapGL from 'react-map-gl';

// Internal dependencies
import withMapControls from '@/modules/core/client/components/withMapControls';

class OfferLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: 0,
        longitude: 0,
        zoom: 13
      }
    };

    this.handleViewportChange = this.handleViewportChange.bind(this);
  }

  handleViewportChange(viewport) {
    this.setState(viewport);
  }

  render() {
    const { offer } = this.props;
    const { viewport } = this.state;

    return (
      <ReactMapGL
        {...viewport}
        className="offer-location"
        height={ 320 }
        onViewportChange={this.handleViewportChange}
        width="100%"
      >
        <Marker
          latitude={offer.location[0]}
          longitude={offer.location[1]}
        >
          {status.status}
        </Marker>
      </ReactMapGL>
    );
  }
}

OfferLocation.propTypes = {
  offer: PropTypes.object.isRequired
};

export default withMapControls(OfferLocation);
