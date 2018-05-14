import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import packageJson from '../../package.json';
import TweetList from './TweetList';

const TRACK = 'nowplaying';
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

  subscribe() {
    const socket = socketIOClient(packageJson.proxy);

    socket.on('tweets', tweet => {
      if (this.belongsToCity(tweet)) {
        this.addTweetsToState([tweet]);
      }
    });

    fetch(`/subscribe?track=${TRACK}`);
  }

  populateRecentTweets(coordinates) {
    const geocode = `${coordinates},${SEARCH_RADIUS}`;

    fetch(`/search?q=${TRACK}&geocode=${geocode}&result_type=${RESULT_TYPE}&count=${TWEET_COUNT}`)
    .then(response => {
      response.json().then(data => {
        this.addTweetsToState(data.statuses);
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
