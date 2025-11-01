const { neon } = require('@netlify/neon');
const sql = neon();

exports.handler = async function (song) {

    let _song = JSON.parse(song);
    
    const updateSong = await sql`
            UPDATE songs
            SET artist = ${_song.artist || null}, album = ${_song.album || null}, year = ${_song.year || null}, lines = ${lines}, title = ${_song.title}
            WHERE id = ${_song.id} RETURNING *;
            `;
    console.log("Created song:", updateSong);

    return {
        statusCode: 200,
        body: JSON.stringify(updateSong || "Error updating song"),
    };
};