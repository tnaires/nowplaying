import React from 'react';

const TweetList = (props) => {
  const tweetItems = props.tweets.map(tweet =>
    <li key={tweet.id}>
      {tweet.text}
    </li>
  );

  return (
    <div>
      <ul>{tweetItems}</ul>
    </div>
  );
};

export default TweetList;
