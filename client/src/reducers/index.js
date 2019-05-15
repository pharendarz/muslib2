import  { combineReducers} from 'redux';

const dumpReducer = (fileList = [], action) => {
    
    switch(action.type){
        case 'READ_DRIVE_DUMP':
            return action.payload;
        case 'READ_FILE_FLAC_DUMP':
            const readSong = action.payload;
            const newState = fileList.map((oldAlbum, indexAlbum) => {
                return oldAlbum.map(oldFile => {
                    const merged = {...readSong, ...oldFile};
                    return oldFile.filePath === readSong.filePath ? merged : oldFile
                }) 
            })
            // console.log('REDUCER PURGATORY NEW STATE:::', newState);
            return newState;
                
        default:
            return fileList;
    }
}
const purgatoryReducer = (fileList = [], action) => {
    
    switch(action.type){
        case 'READ_DRIVE_PURGATORY':
            return action.payload;
        case 'READ_FILE_FLAC_PURGATORY':
            const readSong = action.payload;
            // console.log('REDUCER PURGATORY READ:::', fileList);
            const newState = fileList.map((oldAlbum, indexAlbum) => {
                // console.log('OLD ALBUM READ:::', oldAlbum, 'READ SONG:::::', readSong);
                return oldAlbum.map(oldFile => {
                    const merged = {...readSong, ...oldFile};
                    // console.log('MERGED::::', merged);
                    return oldFile.filePath === readSong.filePath ? merged : oldFile
                }) 
            })
            // console.log('REDUCER PURGATORY NEW STATE:::', newState);
            return newState;
                
        default:
            return fileList;
    }
}

const libraryReducer = (fileList = [], action) => {
    
    switch(action.type){
        case 'READ_DRIVE_LIBRARY':
            return action.payload;
        case 'READ_FILE_FLAC_LIBRARY':
            const readSong = action.payload;
            const newState = fileList.map((oldAlbum, indexAlbum) => {
                return oldAlbum.map(oldFile => {
                    const merged = {...readSong, ...oldFile};
                    return oldFile.filePath === readSong.filePath ? merged : oldFile
                }) 
            })
            return newState;
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

export default combineReducers({
    filePathsDump: dumpReducer,
    filePathsPurgatory: purgatoryReducer,
    filePathsLibrary: libraryReducer,
    mongoAlbums: mongoAlbumsReducer,
});