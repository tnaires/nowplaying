import React, { Component } from 'react';
import './index.css';

class PostTweetForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  postTweet(videoURL, comment) {
    const params = {
      status: `#nowplaying ${comment} ${videoURL}`,
      lat: this.props.coordinates[0],
      long: this.props.coordinates[1]
    };

    return fetch('/api/twitter/status', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(params)
    });
  }

  clearInput(input) {
    input.value = '';
  }

  handleSubmit(event) {
    const videoURL = this.videoURLInput.value;
    const comment = this.commentInput.value;

    this.postTweet(videoURL, comment)
      .then(response => {
        this.clearInput(this.videoURLInput);
        this.clearInput(this.commentInput);
      });
    event.preventDefault();
  }

  render() {
    if (!this.props.cityName) {
      return <h1>Fetching location data...</h1>
    }

    return (
      <div>
        <div className="info">
          <h1>#nowplaying in {this.props.cityName}</h1>
          <p>
            This page shows #nowplaying tweets in {this.props.cityName} that
            contain a youtube link. It also allows you to post a #nowplaying
            tweet with a YouTube link.
          </p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Video URL:
            <input
              className="gray-border"
              type="text"
              placeholder="http://youtube.com"
              size="30"
              ref={(input => this.videoURLInput = input)} />
          </label>
          <label>
            Comment:
            <input
              className="gray-border"
              type="text"
              size="60"
              ref={(input => this.commentInput = input)} />
          </label>
          <input type="submit" value="Tweet to #nowplaying" />
        </form>
      </div>
    );
  }
}

export default PostTweetForm;
