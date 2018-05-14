const express = require('express');
const TwitterService = require('../services/twitter');

const router = express.Router();
const twitterService = new TwitterService();

module.exports = (io) => {
  router.get('/', (req, res, next) => {
    const track = req.query.track;

    twitterService.statusesFilter(track, tweet => {
      io.sockets.emit('tweets', tweet);
    });

    res.send('Subscribed');
  });

  return router;
};
