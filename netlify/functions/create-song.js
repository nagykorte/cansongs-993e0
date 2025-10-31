const { neon } = require('@netlify/neon');
const sql = neon();

exports.handler = async function (song) {

    const deletedSong = await sql`
            DELETE FROM songs
            WHERE id = ${song.id} RETURNING *;
            `;
    console.log("Created song:", deletedSong);

    return {
        statusCode: 200,
        body: JSON.stringify(deletedSong || "Error deleting song"),
    };
};