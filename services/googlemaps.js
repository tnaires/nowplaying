class GoogleMapsService {
  constructor() {
    this.googleMapsClient = require('@google/maps').createClient({
      key: process.env.GOOGLE_MAPS_API_KEY,
      Promise: Promise
    });
  }

  reverseGeocode(latitude, longitude, result_type, doneCallback) {
    const latlng = [latitude, longitude].join(',');
    this.googleMapsClient
      .reverseGeocode({latlng, result_type})
      .asPromise()
      .then(response => {
        doneCallback(response.json.results);
      })
      .catch(error => {
        console.log("ERROR: reverseGeocode endpoint");
        console.log(error);
      });
  }
}

module.exports = GoogleMapsService;
