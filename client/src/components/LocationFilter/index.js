import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import PostTweetForm from '../PostTweetForm';
import TweetSubscription from '../TweetSubscription';
import './index.css';

const RESULT_TYPE = 'locality';

class LocationFilter extends Component {
  state = {
    cityName: undefined,
    coordinates: undefined
  };

  extractCityNameFrom(data) {
    return data[0]
      .address_components
      .filter(item => item.types.includes(RESULT_TYPE))[0]
      .short_name;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coords) {
      fetch(`/api/geocode/reverse?latitude=${nextProps.coords.latitude}&longitude=${nextProps.coords.longitude}&result_type=${RESULT_TYPE}`)
      .then(response => {
        response.json().then(data => {
          const cityName = this.extractCityNameFrom(data);
          const coordinates = [nextProps.coords.latitude, nextProps.coords.longitude];

          this.setState({ cityName, coordinates });
        });
      });
    }
  }

  render() {
    return (
      <div className="main">
        <PostTweetForm
          cityName={this.state.cityName}
          coordinates={this.state.coordinates}
        />
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
