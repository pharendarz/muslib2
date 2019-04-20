export const selectSong = (song) => {
    return {
        type: 'SONG_SELECTED',
        payload: song
    }
}
export const readSongFlacType = (song) => {
    console.log('ACTION READ FLAC SONG');
    return {
        type: 'SONG_READ_FLAC',
        payload: {
            rating: song.rating,
            album: song.album,
            artist: song.artist,
            title: song.title,
        }
    }
}
export const readDrive = (filePaths) => {
    console.log('ACTION READ DRIVE');
    return {
        type: 'READ_DRIVE',
        payload: filePaths
    }
}