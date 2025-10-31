// filepath: netlify/functions/get-songs.js
// const { Client } = require('pg');
import { neon } from '@netlify/neon';
const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL



exports.handler = async function (event, context) {
    // const client = new Client({
    //     connectionString: process.env.NETLIFY_DATABASE_URL, // Set this in Netlify env vars
    //     ssl: { rejectUnauthorized: false }
    // });
    
    // await client.connect();
    // await ensureTable();
    // const res = await client.query('SELECT * FROM songs');
    const [post] = await sql`SELECT * FROM songs WHERE id = 1`;
    const [post2] = await sql`
        CREATE TABLE IF NOT EXISTS songs (
            id SERIAL PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            artist VARCHAR(100),
            album VARCHAR(100),
            year VARCHAR(100),
            lines TEXT NOT NULL
        );`
    // async function ensureTable() {
    //     await sql(`
    // }
    // await client.end();

    return {
        statusCode: 200,
        body: post,
    };
};