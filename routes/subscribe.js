const express = require('express');

module.exports = (io) => {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    res.send('Subscribed');
  });

  return router;
};
