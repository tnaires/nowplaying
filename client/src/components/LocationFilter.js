import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import TweetSubscription from './TweetSubscription';

const RESULT_TYPE = 'locality';

class LocationFilter extends Component {
  state = {
    cityName: undefined,
    coordinates: undefined,
    message: 'Fetching location data...'
  };

  extractCityNameFrom(data) {
    return data[0]
      .address_components
      .filter(item => item.types.includes(RESULT_TYPE))[0]
      .short_name;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coords) {
      fetch(`/geocode/reverse?latitude=${nextProps.coords.latitude}&longitude=${nextProps.coords.longitude}&result_type=${RESULT_TYPE}`)
      .then(response => {
        response.json().then(data => {
          const cityName = this.extractCityNameFrom(data);
          const coordinates = [nextProps.coords.latitude, nextProps.coords.longitude].join(',');
          const message = `Fetching tweets from ${cityName}...`;

          this.setState({ cityName, coordinates, message });
        });
      });
    }
  }

  render() {
    return (
      <div>
        <p>{this.state.message}</p>
        <TweetSubscription
          cityName={this.state.cityName}
          coordinates={this.state.coordinates}
        />
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
