import  { combineReducers} from 'redux';

const purgatoryReducer = (fileList = [], action) => {
    
    switch(action.type){
        case 'READ_DRIVE_PURGATORY':
            return action.payload;
        case 'READ_FILE_FLAC_PURGATORY':
            const song = action.payload;
            return fileList.map(oldSong => oldSong.filePath === song.filePath ? song : oldSong)
        default:
            return fileList;
    }
}
const libraryReducer = (fileList = [], action) => {
    
    switch(action.type){
        case 'READ_DRIVE_LIBRARY':
            return action.payload;
        case 'READ_FILE_FLAC_LIBRARY':
            const song = action.payload;
            return fileList.map(oldSong => oldSong.filePath === song.filePath ? song : oldSong)
        default:
            return fileList;
    }
}
const mongoAlbumsReducer = (fileList = [], action) => {
    
    switch(action.type){
        case 'READ_MONGO_ALBUMS':
            return action.payload;
        // case 'CREATE_MONGO_ALBUMS':
        //     return action.payload;
        default:
            return fileList;
    }
}

const selectedSongReducer = (selectedSong = null, action) => {
    if (action.type === 'SONG_SELECTED'){
        return action.payload;
    }
    return selectedSong;
}

export default combineReducers({
    filePathsPurgatory: purgatoryReducer,
    filePathsLibrary: libraryReducer,
    mongoAlbums: mongoAlbumsReducer,
    selectedSong: selectedSongReducer,
});