const { neon } = require('@netlify/neon');
const sql = neon();

exports.handler = async function (song) {
    
    const updateSong = await sql`
            UPDATE songs
            SET artist = ${song.artist || null}, album = ${song.album || null}, year = ${song.year || null}, lines = ${lines}, title = ${song.title}
            WHERE id = ${song.id} RETURNING *;
            `;
    console.log("Created song:", updateSong);

    return {
        statusCode: 200,
        body: JSON.stringify(updateSong || "Error updating song"),
    };
};