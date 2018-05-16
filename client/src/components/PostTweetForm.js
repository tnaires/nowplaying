import React, { Component } from 'react';

class PostTweetForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    if (!this.props.cityName) {
      return <h1>Fetching location data...</h1>
    }

    return (
      <div>
        <h1>#nowplaying in {this.props.cityName}</h1>
        <p>
          This page shows #nowplaying tweets in {this.props.cityName} that
          contain a youtube link. It also allows you to post a #nowplaying
          tweet with a YouTube link.
        </p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Video URL:
            <input type="text" ref={(input => this.videoURLInput = input)} />
          </label>
          <label>
            Comment:
            <input type="text" ref={(input => this.commentInput = input)} />
          </label>
          <input type="submit" value="Tweet to #nowplaying" />
        </form>
      </div>
    );
  }
}

export default PostTweetForm;
