// filepath: netlify/functions/get-songs.js
// const { Client } = require('pg');
const { neon } = require('@netlify/neon');
import { songs } from ('../../data/songs.json');
const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL



exports.handler = async function (event, context) {
    // const client = new Client({
    //     connectionString: process.env.NETLIFY_DATABASE_URL, // Set this in Netlify env vars
    //     ssl: { rejectUnauthorized: false }
    // });
    
    // await client.connect();
    // await ensureTable();
    // const res = await client.query('SELECT * FROM songs');
    console.log("Fetching songs from database...");
    console.log(sql)
    await sql`
    CREATE TABLE IF NOT EXISTS songs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        artist VARCHAR(100),
        album VARCHAR(100),
        year VARCHAR(100),
        lines TEXT NOT NULL
        );`

    const insertResults = await Promise.all(
        songs.map(song => {
            const lines = Array.isArray(song.lines) ? song.lines.join('\n') : song.lines;
            return sql`
                INSERT INTO songs (title, artist, album, year, lines)
                SELECT ${song.title}, ${song.artist || null}, ${song.album || null}, ${song.year || null}, ${lines}
                WHERE NOT EXISTS (
                    SELECT 1 FROM songs WHERE title = ${song.title} AND (artist IS NOT DISTINCT FROM ${song.artist || null})
                )`;
        })
    );

    console.log("Inserted/ensured songs count:", insertResults.length);
    console.log("Ensured songs table exists.");
    const allSongs = await sql`SELECT * FROM songs`;
    console.log("Fetched songs:", allSongs);
    // async function ensureTable() {
        //     await sql(`
        // }
    // await client.end();

    return {
        statusCode: 200,
        body: JSON.stringify(allSongs || []),
    };
};