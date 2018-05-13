const express = require('express');

const openTweetsFilterStream = require('../services/twitter');

module.exports = (io) => {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    openTweetsFilterStream('nowplaying', tweet => {
      console.log(tweet);
    });

    res.send('Subscribed');
  });

  return router;
};
