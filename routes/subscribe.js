const express = require('express');
const TwitterService = require('../services/twitter');

const router = express.Router();
const HASHTAG = 'nowplaying';
const twitterService = new TwitterService();

module.exports = (io) => {
  router.get('/', (req, res, next) => {
    twitterService.openFilterStream(HASHTAG, tweet => {
      io.sockets.emit(HASHTAG, tweet);
    });

    res.send('Subscribed');
  });

  return router;
};
