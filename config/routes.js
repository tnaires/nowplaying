const declareAllRoutes = require('../routes');

const CONTEXT = '/api';

module.exports = (app, io) => {
  app.use(CONTEXT, declareAllRoutes(io));
};
