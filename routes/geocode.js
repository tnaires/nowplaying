const express = require('express');
const GoogleMapsService = require('../services/googlemaps');

const router = express.Router();
const googleMapsService = new GoogleMapsService();

module.exports = () => {
  router.get('/reverse', (req, res, next) => {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const result_type = req.query.result_type;

    googleMapsService.reverseGeocode(latitude, longitude, result_type, results => {
      res.send(results);
    });
  });

  return router;
};
