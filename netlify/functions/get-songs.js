// filepath: netlify/functions/get-songs.js
// const { Client } = require('pg');
const { neon } = require('@netlify/neon');
const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL

exports.handler = async function (event, context) {
    console.log("Fetching songs from database...");

    const allSongs = await sql`SELECT * FROM songs`;
    console.log("Fetched songs:", allSongs);

    return {
        statusCode: 200,
        body: JSON.stringify(allSongs || []),
    };
};