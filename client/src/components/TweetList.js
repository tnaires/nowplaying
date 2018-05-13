import React from 'react';
import Tweet from './Tweet';

const TweetList = (props) => {
  const tweetItems = props.tweets.map(tweet =>
    <Tweet tweet={tweet} />
  );

  return (
    <div>
      <ul>{tweetItems}</ul>
    </div>
  );
};

export default TweetList;
