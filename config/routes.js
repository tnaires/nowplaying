const subscribeRoute = require('../routes/subscribe');
const geocodeRoute = require('../routes/geocode');

module.exports = (app, io) => {
  app.use('/subscribe', subscribeRoute(io));
  app.use('/geocode', geocodeRoute());
};
