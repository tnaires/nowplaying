const subscribeRoute = require('../routes/subscribe');
const searchRoute = require('../routes/search');
const geocodeRoute = require('../routes/geocode');

module.exports = (app, io) => {
  app.use('/subscribe', subscribeRoute(io));
  app.use('/search', searchRoute());
  app.use('/geocode', geocodeRoute());
};
