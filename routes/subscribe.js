const express = require('express');
const Twitter = require('twitter');

module.exports = (io) => {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    const client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    client.stream('statuses/filter', {track: 'nowplaying'}, stream => {
      stream.on('data', tweet => {
        console.log(tweet);
      });

      stream.on('error', error => {
        throw error;
      });
    });

    res.send('Subscribed');
  });

  return router;
};
