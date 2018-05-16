const declareAllRoutes = require('../routes');

const GLOBAL_PATH = '/';

module.exports = (app, io) => {
  app.use(GLOBAL_PATH, declareAllRoutes(io));
};
