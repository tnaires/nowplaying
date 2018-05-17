const express = require('express');
const TwitterService = require('./services/twitter');
const GoogleMapsService = require('./services/googlemaps');

const router = express.Router();
const twitterService = new TwitterService();
const googleMapsService = new GoogleMapsService();

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;

module.exports = (io) => {
  router.get('/twitter/subscribe', (req, res, next) => {
    const track = req.query.track;
    const onNewTweet = tweet => {
      io.sockets.emit('tweets', tweet);
    };
    const onError = error => {
      console.log("An error happened when fetching new tweet:");
      console.log(error);
    };

    twitterService.statusesFilter(track, onNewTweet, onError)
      .then(result => res.status(OK).send(result))
      .catch(error => res.status(BAD_REQUEST));
  });

  router.get('/geocode/reverse', (req, res, next) => {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const result_type = req.query.result_type;

    googleMapsService.reverseGeocode(latitude, longitude, result_type)
      .then(response => res.status(OK).send(response.json.results))
      .catch(error => res.status(BAD_REQUEST));
  });

  router.get('/twitter/search', (req, res, next) => {
    const q = req.query.q;
    const geocode = req.query.geocode;
    const result_type = req.query.result_type;

    twitterService.standardSearch(q, geocode, result_type)
      .then(tweets => res.status(OK).send(tweets))
      .catch(error => res.status(BAD_REQUEST));
  });

  router.post('/twitter/status', (req, res, next) => {
    const status = req.body.status;
    const lat = req.body.lat;
    const long = req.body.long;

    twitterService.statusesUpdate(status, lat, long)
      .then(tweet => res.status(CREATED).send(tweet))
      .catch(error => res.status(BAD_REQUEST));
  });

  return router;
};
