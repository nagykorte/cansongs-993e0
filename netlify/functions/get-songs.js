// filepath: netlify/functions/get-songs.js
const { Client } = require('pg');

exports.handler = async function (event, context) {
    const client = new Client({
        connectionString: process.env.NETLIFY_DATABASE_URL, // Set this in Netlify env vars
        ssl: { rejectUnauthorized: false }
    });

    await client.connect();
    await ensureTable();
    const res = await client.query('SELECT * FROM songs');
    async function ensureTable() {
        await sql(`
        CREATE TABLE IF NOT EXISTS songs (
            id SERIAL PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            artist VARCHAR(100),
            album VARCHAR(100),
            year VARCHAR(100),
            lines TEXT NOT NULL
        );`)
    }
    await client.end();

    return {
        statusCode: 200,
        body: JSON.stringify(res.rows),
    };
};