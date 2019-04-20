import axios from 'axios';
import  { combineReducers} from 'redux';


// const handleGetSongs = async (readTags) => {
//     return await axios.post('/readdrive', {readTags: readTags}).then(response => response.data).then(result => {
//         // console.log('NODE RESULT', result);
//         if(result){
//             return result.filePath
//         } else
//             return [];
//     })
// }

const filePathsReducer = (fileList = [], action) => {
    //static list of songs
    // const fileList = await handleGetSongs(false);

    
    switch(action.type){
        case 'READ_DRIVE':
            console.log(action.type, 'filePathsReducer', fileList);
            // console.log('REDUCER READ DRIVE    ', action.payload )
            return action.payload;

        case 'SONG_READ_FLAC':
            return fileList;
        default:
            console.log(action.type, 'filePathsReducer DEFAULT', fileList);
            fileList = [
                'no files read',
            ]
            return fileList;
    }
}

const selectedSongReducer = (selectedSong = null, action) => {
    if (action.type === 'SONG_SELECTED'){
        return action.payload;
    }
    if (action.type === 'SONG_READ_FLAC'){
        return action.payload;
    }
    return selectedSong;
}

export default combineReducers({
    filePaths: filePathsReducer,
    selectedSong: selectedSongReducer,
});