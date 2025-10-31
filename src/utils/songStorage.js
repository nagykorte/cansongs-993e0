import { songs } from '../../data/songs.json'

const getSongs = () => {
    return songs
}

const saveSong = (song) => {
    songs = [ ...songs, song ]
}
const deleteSong = (song) => {
    songs = songs.filter((s) => s !== song)
}

export { getSongs, saveSong, deleteSong }
