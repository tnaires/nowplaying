import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import TweetList from '../TweetList';

const TRACK = encodeURIComponent('#nowplaying');
const QUERY = `${TRACK} ${encodeURIComponent('url:youtube')}`
const SEARCH_RADIUS = '15km';
const RESULT_TYPE = 'recent';
const TWEET_COUNT = 5;

export default class TweetSubscription extends Component {
  state = { tweets: [] };

  addTweetsToState(newTweets) {
    this.setState(prevState => ({
      tweets: [...newTweets, ...prevState.tweets]
    }));
  }

  belongsToCity(tweet) {
    const cityName = this.props.cityName || '';
    return tweet.place && tweet.place.name.toLowerCase() === cityName.toLowerCase();
  }

  find(urls, word) {
    return urls.find(url => url.expanded_url.includes(word));
  }

  isVideo(tweet) {
    const urls = tweet.entities.urls;
    return urls && (this.find(urls, 'youtube') || this.find(urls, 'youtu.be'));
  }

  subscribe() {
    const socket = socketIOClient();

    socket.on('tweets', tweet => {
      if (this.belongsToCity(tweet) && this.isVideo(tweet)) {
        this.addTweetsToState([tweet]);
      }
    });

    fetch(`/api/twitter/subscribe?track=${TRACK}`);
  }

  populateRecentTweets(coordinates) {
    const parsedCoordinates = coordinates.join(',');
    const geocode = `${parsedCoordinates},${SEARCH_RADIUS}`;

    fetch(`/api/twitter/search?q=${QUERY}&geocode=${geocode}&result_type=${RESULT_TYPE}`)
    .then(response => {
      response.json().then(data => {
        const onlyFirstOnes = data.statuses.slice(0, TWEET_COUNT);
        this.addTweetsToState(onlyFirstOnes);
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cityName) {
      this.subscribe();
    }

    if (nextProps.coordinates) {
      this.populateRecentTweets(nextProps.coordinates);
    }
  }

  render() {
    return <TweetList tweets={this.state.tweets} />;
  }
}
