const pg = require('pg');
const config = require('./../env/dev').postgres;

const dbConfig = {
    user: config.username,
    database: config.database,
    host: config.host,
    port: config.port,
    max: 20,
    min: 4
};

const pool = new pg.Pool(dbConfig);

process.on('exit', () => {
    pool.end();
});

module.exports = {
    getGames: () => new Promise(async (resolve) => {
        let client = null;
        try {
            client = await pool.connect();
            const data = await client.query('SELECT * FROM game');
            client.release();
            resolve(data.rows);
        } catch (e) {
            if (client) client.release();
            resolve(null);
        }
    })
};
