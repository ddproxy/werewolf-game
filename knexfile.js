// Update with your config settings.

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
        ssl: true
        connection: process.env.DATABASE_URL,
    }
};
