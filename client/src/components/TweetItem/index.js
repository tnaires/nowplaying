import React from 'react';
import { Tweet } from 'react-twitter-widgets';
import './index.css';

const TweetItem = (props) => {
  return (
    <li key={props.tweet.id_str}>
      <Tweet tweetId={props.tweet.id_str} />
    </li>
  );
};

export default TweetItem;
