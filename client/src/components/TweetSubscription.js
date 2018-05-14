import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import packageJson from '../../package.json';
import TweetList from './TweetList';

const TRACK = 'nowplaying';

export default class TweetSubscription extends Component {
  state = { tweets: [] };

  subscribe() {
    const socket = socketIOClient(packageJson.proxy);

    socket.on('tweets', tweet => {
      this.setState(prevState => ({
        tweets: [tweet, ...prevState.tweets]
      }));
    });

    fetch(`/subscribe?track=${TRACK}`);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cityName) {
      this.subscribe();
    }
  }

  render() {
    return <TweetList tweets={this.state.tweets} cityName={this.props.cityName} />;
  }
}
