import React, { Component } from 'react';

class Tweet extends Component {
  render() {
    return (
      <li key={this.props.tweet.id_str}>
        {this.props.tweet.text}
      </li>
    );
  }
}

export default Tweet;
