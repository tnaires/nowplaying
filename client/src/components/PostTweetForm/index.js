import React, { Component } from 'react';
import './index.css';

class PostTweetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { showErrors: false };
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
    const videoURL = this.videoURLInput.value.trim();
    const comment = this.commentInput.value.trim();
    const showErrors = (videoURL === '' || comment === '');

    this.setState({ showErrors });

    if (!showErrors) {
      this.postTweet(videoURL, comment)
        .then(response => {
          this.clearInput(this.videoURLInput);
          this.clearInput(this.commentInput);
        });
    }

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
          {this.state.showErrors &&
            <div className="errors">
              Please fill both fields to post your tweet.
            </div>
          }
          <label>
            Video URL:
            <input
              className="url gray-border"
              type="text"
              placeholder="http://youtube.com"
              ref={(input => this.videoURLInput = input)} />
          </label>
          <label>
            Comment:
            <input
              className="comment gray-border"
              type="text"
              ref={(input => this.commentInput = input)} />
          </label>
          <input type="submit" value="Tweet to #nowplaying" />
        </form>
      </div>
    );
  }
}

export default PostTweetForm;
