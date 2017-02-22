'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/stats-dev'
  },

  // Postgres connection options
  postgres: {
    uri: process.env.POSTGRES_URL ||
         'postgres://user:pass@localhost:5432/stats'
  },
  database: 'stats',
  username: 'root',
  password: '',
  seedDB: true
};
