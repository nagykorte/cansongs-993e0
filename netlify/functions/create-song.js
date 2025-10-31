const { neon } = require('@netlify/neon');
const sql = neon();

exports.handler = async function (song) {
    
    const createSong = await sql`
            INSERT INTO songs (title, artist, album, year, lines)
            SELECT ${song.title}, ${song.artist || null}, ${song.album || null}, ${song.year || null}, ${song.lines.join('\n')}
            RETURNING *;`;
    console.log("Created song:", createSong);

    return {
        statusCode: 200,
        body: JSON.stringify(createSong || "Error creating song"),
    };
};
