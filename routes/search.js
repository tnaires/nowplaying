const express = require('express');
const TwitterService = require('../services/twitter');

const router = express.Router();
const twitterService = new TwitterService();

module.exports = () => {
  router.get('/', (req, res, next) => {
    const q = req.query.q;
    const geocode = req.query.geocode;
    const result_type = req.query.result_type;
    const count = req.query.count;

    twitterService.standardSearch(q, geocode, result_type, count, tweets => {
      res.send(tweets);
    });
  });

  return router;
};
