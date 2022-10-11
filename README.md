# nowplaying

## Overview

This application returns the most recent tweets from the user's city that contain videos and are published under the #nowplaying hashtag.

## How to run the application locally

You need to have [Node.js](https://nodejs.org/en/) installed on your machine.

Run `npm run both` from the project root path to run the server and the client. Then open http://localhost:3000 in your browser.

## Tools used

* [React](https://reactjs.org/): I decided to use React mainly for two reasons: firstly, because it's one of the tools I've been trying to focus my learning efforts on lately; and secondly because it's one of the UI tools I feel most comfortable working with, taking into account what I've learned so far.

* [Express](https://expressjs.com/): I'm using Express in the back-end because I feel it's one of the most flexible servers to write APIs that I know. Also, I feel it's easy to integrate with React.

* [Socket.IO](https://socket.io/): I'm using this tool specifically to integrate better with the Twitter streaming API, which I'm using to fetch realtime tweets. Through Socket.IO I can easily publish new tweets from the server to the client, as soon as I get the client subscribed to the server.
