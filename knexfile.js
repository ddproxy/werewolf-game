require('dotenv').config();
const pg = require('pg');
if (process.env.NODE_ENV === 'production') {
    pg.defaults.ssl = true;
}

module.exports = {

    development: {
        client: 'pg',
        connection: {
            host: process.env.HOST,
            database: process.env.DATABASE,
            password: process.env.DATABASE_PASSWORD,
            user: process.env.DATABASE_USER
        }
    },

    test: {
        client: 'pg',
        connection: {
            host: process.env.HOST,
            database: process.env.DATABASE,
            password: process.env.DATABASE_PASSWORD,
            user: process.env.DATABASE_USER
        }
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    }
};
