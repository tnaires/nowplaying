class GoogleMapsService {
  constructor() {
    this.googleMapsClient = require('@google/maps').createClient({
      key: process.env.GOOGLE_MAPS_API_KEY,
      Promise: Promise
    });
  }

  reverseGeocode(latitude, longitude, result_type) {
    const latlng = [latitude, longitude].join(',');

    return this.googleMapsClient
      .reverseGeocode({latlng, result_type})
      .asPromise();
  }
}

module.exports = GoogleMapsService;
