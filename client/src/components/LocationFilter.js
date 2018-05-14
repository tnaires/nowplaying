import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import TweetSubscription from './TweetSubscription';

const RESULT_TYPE = 'locality';

class LocationFilter extends Component {
  state = {
    location: undefined,
    message: 'Fetching location data...'
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.coords) {
      fetch(`/geocode/reverse?latitude=${nextProps.coords.latitude}&longitude=${nextProps.coords.longitude}&result_type=${RESULT_TYPE}`)
      .then(response => {
        response.json().then(data => {
          const cityName = data[0]
            .address_components
            .filter(item => item.types.includes(RESULT_TYPE))[0]
            .short_name;

          const bounds = data[0].geometry.bounds;
          const swLng = bounds.southwest.lng;
          const swLat = bounds.southwest.lat;
          const neLng = bounds.northeast.lng;
          const neLat = bounds.northeast.lat;

          this.setState({
            message: `Fetching tweets from ${cityName}...`,
            location: `${swLng},${swLat},${neLng},${neLat}`
          });
        });
      });
    }
  }

  render() {
    return (
      <div>
        <p>{this.state.message}</p>
        {this.state.location &&
          <TweetSubscription location={this.state.location} />
        }
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000
})(LocationFilter);
