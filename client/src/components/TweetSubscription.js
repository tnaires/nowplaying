import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import packageJson from '../../package.json';
import TweetList from './TweetList';

export default class TweetSubscription extends Component {
  state = { tweets: [] };

  componentDidMount() {
    const socket = socketIOClient(packageJson.proxy);
    socket.on('nowplaying', tweet => {
      this.setState(prevState => ({
        tweets: [tweet, ...prevState.tweets]
      }));
    });

    fetch('/subscribe');
  }

  render() {
    return <TweetList tweets={this.state.tweets} />;
  }
}
