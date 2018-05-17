import React from 'react';
import TweetItem from './TweetItem';

const TweetList = (props) => {
  const tweetItems = props.tweets
    .map(tweet =>
      <TweetItem tweet={tweet} />
    );

  return (
    <div>
      <ul>{tweetItems}</ul>
    </div>
  );
};

export default TweetList;
