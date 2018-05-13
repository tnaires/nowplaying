const subscribeRoute = require('../routes/subscribe');

module.exports = (app, io) => {
  app.use('/subscribe', subscribeRoute(io));
};
