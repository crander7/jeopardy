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
        console.log('hit pgmodel');
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM game');
        console.log(data);
        client.release();
        resolve(data.rows);
    })
};
