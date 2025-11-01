const { neon } = require('@netlify/neon');
const sql = neon();

exports.handler = async function (song) {

    let _song = JSON.parse(song);
    try {

        const updateSong = await sql`
        UPDATE songs
        SET artist = ${_song.artist || null}, album = ${_song.album || null}, year = ${_song.year || null}, lines = ${lines}, title = ${_song.title}
        WHERE id = ${_song.id} RETURNING *;
        `;
        console.log("Created song:", updateSong);
    } catch (error) {
        console.error("Error parsing song data:", error);
        return {
            statusCode: 400,
            body: JSON.stringify({song: _song, msg: error.message}),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(updateSong || "Error updating song"),
    };
};