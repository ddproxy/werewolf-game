
'use strict';

require('dotenv').config();
const pg = require('pg');
if (process.env.NODE_ENV === 'production') {
  pg.defaults.ssl = true;
}

module.exports = {

    development: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            database: 'werewolf_game_dev'
        }
    },

    test: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            database: 'werewolf_game_test'
        }
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    }
};
