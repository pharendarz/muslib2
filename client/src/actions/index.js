import axios from 'axios';
//app functions
import {createAlbums} from '../commonFunctions/dev';
export const readDrivePurgatory = (filePaths) => {
    return {
        type: 'READ_DRIVE_PURGATORY',
        payload: filePaths
    }
}
export const readDriveLibrary = (filePaths) => {
    return {
        type: 'READ_DRIVE_LIBRARY',
        payload: filePaths
    }
}
export const readMongoAlbums = (albums) => {
    console.log(`ALBUMS ACTION`, albums);
    return {
        type: 'READ_MONGO_ALBUMS',
        payload: albums
    }
}
export const createMongoAlbumsFromPurgatory = (albums) => {
    console.log(`createMongoAlbumsFromPurgatory ACTION`, albums);
    createAlbums(albums);
    
    return {
        type: 'CREATE_MONGO_ALBUMS',
        payload: albums
    }
}
export const readAllSongsWithFlacType = (view) => (dispatch, getState) => {
    if (!view) return;
    let filePaths = [];
    switch(view){
        case 'PURGATORY':
            filePaths = getState().filePathsPurgatory;
            break;
        case 'LIBRARY':
            filePaths = getState().filePathsLibrary;
            break;
        case 'ALBUMS':
            filePaths = getState().filePathsAlbums;
            break;
        default:
            break;
    }
    
    console.log('FILEPATHS:', filePaths);
    filePaths.forEach(obj => {

        const response = axios({method: 'post', url: '/readflac', timeout: 5000, data: {filePath: obj.filePath}})
            .then(response => response.data)
            .catch(err => {
                console.log('ERRRRRRRRRORRRRRR', err.message);
            })            
            .then(result => {
                // console.log('result', result);
                if(result){
                    let songObj = {
                        filePath: obj.filePath,
                        rating: null,
                        album: null,
                        artist: null,
                        title: null,
                        indexAlbum: null,
                        indexTrack: null,
                    };
                    for (let i=0; i<result.metadata.length; i++){
                        const key = Object.keys(result.metadata[i])[0];
                        const value = result.metadata[i][key];
                        // console.log(key, value);
                        switch(key.toLowerCase()){
                            case 'rating': {
                                songObj.rating = value;
                                break;
                            }
                            case 'indexalbum': {
                                songObj.indexAlbum = value;
                                break;
                            }
                            case 'indextrack': {
                                songObj.indexTrack = value;
                                break;
                            }
                            case 'artist': {
                                songObj.artist = value;
                                break;
                            }
                            case 'title': {
                                songObj.title = value;
                                break;
                            }
                            default:
                                break;
                        }
                    }
                    //call action creator
                    dispatch(readSongFlacType(songObj, view));
                }
            });
    })

}

export const readSongFlacType = (song, view) => (dispatch, getState) => {
    switch(view){
        case 'LIBRARY':
            dispatch({type: 'READ_FILE_FLAC_LIBRARY', payload: song})
            break;
        case 'PURGATORY':
            dispatch({type: 'READ_FILE_FLAC_PURGATORY', payload: song})
            break;
        case 'ALBUMS':
            dispatch({type: 'READ_FILE_FLAC_ALBUMS', payload: song})
            break;
        default:
            break;
    }
}