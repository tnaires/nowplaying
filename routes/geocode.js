const express = require('express');
const GoogleMapsService = require('../services/googlemaps');

const router = express.Router();
const googleMapsService = new GoogleMapsService();

module.exports = () => {
  router.get('/reverse', async (req, res, next) => {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const result_type = req.query.result_type;

    const results = await googleMapsService.reverseGeocode(latitude, longitude, result_type);
    res.send(results);
  });

  return router;
};
