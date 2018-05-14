import React from 'react';

const Tweet = (props) => {
  return (
    <li key={props.tweet.id_str}>
      {props.tweet.text}
    </li>
  );
};

export default Tweet;
