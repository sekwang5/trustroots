import React, { Component } from 'react';
import OffersPresentational from './OffersPresentational';

import PropTypes from 'prop-types';

export class Offers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offer: {},
      isLoading: true,
      isOwnOffer: false,
      isUserPublic: false,
      isMobile: window.navigator.userAgent.toLowerCase().indexOf('mobile') >= 0 || window.isNativeMobileApp // TODO check userAgent
    }
      profile: {}
    };
  }

  componentDidMount() {
    const that = this;
    const { profile, authUser } = this.props;
    if (!profile) {
      this.setState(() => ({
        isLoading: false
      }));
      return;
    }
    if (profile._id) {
      that.setState(() => ({
        profile: profile,
        isOwnOffer: (authUser && authUser._id && authUser._id === profile._id),
        isUserPublic: (authUser && authUser.public)
      }));

      // TODO fetch offer data
      fetch(`/api/offers-by/${profile._id}`,{
        method: 'GET'
      })
        .then(response => response.json())
        .then(offers => {
          if (!offers || !offers.length) {
            this.setState(() => ({
              isLoading: false
            })
            );
          } else {
            const off = offers[0];
            that.setState(() => ({
              offer: off,
              isLoading: false
            }));
          }
        });
    }
  }

  render(){
    return <OffersPresentational
      isOwnOffer={this.state.isOwnOffer}
      isUserPublic={this.state.isUserPublic}
      offer={this.state.offer}
      username={this.state.profile.username}>
    </OffersPresentational>;
  }
};

Offers.propTypes = {
  authUser: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default Offers;
