const movieResolver = require('./movie');

const rootResolver = {
  ...movieResolver
};

module.exports = rootResolver;
