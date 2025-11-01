const { neon } = require('@netlify/neon');
const sql = neon();

exports.handler = async function (song) {
    try {

        let _song = JSON.parse(song);
        const createSong = await sql`
        INSERT INTO songs (title, artist, album, year, lines)
        SELECT ${_song.title}, ${_song.artist || null}, ${_song.album || null}, ${_song.year || null}, ${_song.lines.join('\n')}
        RETURNING *;`;
        console.log("Created song:", createSong);
    } catch (error) {
        console.error("Error creating song:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ song: _song, error: error.message || "Unknown error" })
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(createSong || "Error creating song"),
    };
};
