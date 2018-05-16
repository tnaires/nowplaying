const Twitter = require('twitter');
const axios = require('axios');

class TwitterService {
  constructor() {
    this.client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
  }

  standardSearch(q, geocode, result_type) {
    const params = { q, geocode, result_type };
    return this.client.get('search/tweets', params);
  }

  statusesFilter(track, onNewTweetCallback, onError) {
    return new Promise(resolve => {
      const params = { track };

      this.client.stream('statuses/filter', params, stream => {
        stream.on('data', tweet => {
          onNewTweetCallback(tweet);
        });

        stream.on('error', error => {
          onError(error);
        });
      });

      resolve('Subscribed');
    });
  }

  statusesUpdate(status, lat, long) {
    const params = { status, lat, long };
    return this.client.post('statuses/update', params);
  }

  async oEmbed(url) {
    const path = `https://publish.twitter.com/oembed?url=${url}`;
    const response = await axios.get(path);

    return new Promise(resolve => {
      resolve(response.data);
    });
  }
}

module.exports = TwitterService;
