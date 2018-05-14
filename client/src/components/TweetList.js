import React from 'react';
import Tweet from './Tweet';

const TweetList = (props) => {
  if (props.cityName) {
    const cityName = props.cityName.toLowerCase();

    const tweetItems = props.tweets
      .filter(tweet =>
        tweet.place && tweet.place.name.toLowerCase() === cityName
      )
      .map(tweet =>
        <Tweet tweet={tweet} />
      );

    return (
      <div>
        <ul>{tweetItems}</ul>
      </div>
    );
  }

  return (
    <div></div>
  );
};

export default TweetList;
