const Twitter = require('twitter');

class TwitterService {
  constructor() {
    this.client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
  }

  openFilterStream(hashtag, onNewTweetCallback) {
    this.client.stream('statuses/filter', {track: hashtag}, stream => {
      stream.on('data', tweet => {
        onNewTweetCallback(tweet);
      });

      stream.on('error', error => {
        throw error;
      });
    });
  }
}

module.exports = TwitterService;
