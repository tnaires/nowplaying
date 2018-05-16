const express = require('express');
const TwitterService = require('./services/twitter');
const GoogleMapsService = require('./services/googlemaps');

const router = express.Router();
const twitterService = new TwitterService();
const googleMapsService = new GoogleMapsService();

module.exports = (io) => {
  router.get('/twitter/subscribe', (req, res, next) => {
    const track = req.query.track;

    twitterService.statusesFilter(track, tweet => {
      io.sockets.emit('tweets', tweet);
    });

    res.send('Subscribed');
  });

  router.get('/geocode/reverse', (req, res, next) => {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const result_type = req.query.result_type;

    googleMapsService.reverseGeocode(latitude, longitude, result_type, results => {
      res.send(results);
    });
  });

  router.get('/twitter/search', (req, res, next) => {
    const q = req.query.q;
    const geocode = req.query.geocode;
    const result_type = req.query.result_type;

    twitterService.standardSearch(q, geocode, result_type, tweets => {
      res.send(tweets);
    });
  });

  return router;
};
