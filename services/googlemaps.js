class GoogleMapsService {
  constructor() {
    this.googleMapsClient = require('@google/maps').createClient({
      key: process.env.GOOGLE_MAPS_API_KEY,
      Promise: Promise
    });
  }

  async reverseGeocode(latitude, longitude, result_type) {
    const latlng = [latitude, longitude].join(',');
    const response = await this.googleMapsClient
      .reverseGeocode({latlng, result_type})
      .asPromise();

    return response.json.results;
  }
}

module.exports = GoogleMapsService;
