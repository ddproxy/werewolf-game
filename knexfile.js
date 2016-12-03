// Update with your config settings.

process.env.DATABASE_URL.sslmode = "require";

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
