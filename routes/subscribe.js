const express = require('express');
const openTweetsFilterStream = require('../services/twitter');

const HASHTAG = 'nowplaying';

module.exports = (io) => {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    openTweetsFilterStream(HASHTAG, tweet => {
      io.sockets.emit(HASHTAG, tweet);
    });

    res.send('Subscribed');
  });

  return router;
};
