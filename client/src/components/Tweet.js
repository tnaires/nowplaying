import React from 'react';

const Tweet = (props) => {
  return (
    <li key={props.tweet.id}>
      {props.tweet.text}
    </li>
  );
};

export default Tweet;
